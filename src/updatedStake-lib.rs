use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

const STAKER_SEED: &[u8] = b"staker";
const VAULT_SEED: &[u8] = b"vault";

declare_id!("9Z8DPy12nRaxMhKAmrCcXKAWKGyUwpkZLwpBG592AcWv");

const APR_BASIS_POINTS: u64 = 1000; // example 10%
const SECONDS_PER_YEAR: u64 = 31_536_000;

#[program]
pub mod staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.admin = ctx.accounts.owner.key();
        vault.bump = ctx.bumps.vault;
        Ok(())
    }

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        let staker = &mut ctx.accounts.staker;
        staker.user = ctx.accounts.user.key();
        staker.amount_staked = 0;
        staker.last_update = 0;
        Ok(())
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        require!(amount > 0, StakingError::ZeroAmount);

        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };

        token::transfer(
            CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts),
            amount,
        )?;

        let staker = &mut ctx.accounts.staker;
        staker.amount_staked = staker
            .amount_staked
            .checked_add(amount)
            .ok_or(StakingError::Overflow)?;
        staker.last_update = Clock::get()?.unix_timestamp;

        emit!(StakeEvent {
            staker: ctx.accounts.user.key(),
            amount,
            total_staked: staker.amount_staked,
            timestamp: staker.last_update,
        });

        Ok(())
    }

    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
        require!(amount > 0, StakingError::ZeroAmount);
        require!(
            ctx.accounts.staker.amount_staked >= amount,
            StakingError::InsufficientStake
        );

        let vault = &mut ctx.accounts.vault;

        // Claim rewards before unstaking, inline logic here
        claim_rewards_internal(
            ctx.accounts.staker.amount_staked,
            &mut ctx.accounts.staker,
            &ctx.accounts.vault_token_account,
            &ctx.accounts.user_token_account,
            vault,
            &ctx.accounts.token_program,
            vault.bump,
            ctx.accounts.user.key(),
        )?;

        let staker = &mut ctx.accounts.staker;
        staker.amount_staked = staker
            .amount_staked
            .checked_sub(amount)
            .ok_or(StakingError::Underflow)?;
        staker.last_update = Clock::get()?.unix_timestamp;

        let seeds = &[VAULT_SEED, &[vault.bump]];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: vault.to_account_info(),
        };

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        );

        token::transfer(cpi_ctx, amount)?;

        emit!(UnstakeEvent {
            staker: ctx.accounts.user.key(),
            amount,
            total_staked: staker.amount_staked,
            timestamp: staker.last_update,
        });

        Ok(())
    }

    pub fn claim_rewards(ctx: Context<ClaimRewards>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        claim_rewards_internal(
            ctx.accounts.staker.amount_staked,
            &mut ctx.accounts.staker,
            &ctx.accounts.vault_token_account,
            &ctx.accounts.user_token_account,
            vault,
            &ctx.accounts.token_program,
            vault.bump,
            ctx.accounts.user.key(),
        )
    }

    pub fn get_pending_rewards(ctx: Context<StakerQuery>) -> Result<u64> {
        let now = Clock::get()?.unix_timestamp;
        let elapsed = now - ctx.accounts.staker.last_update;
        const REWARD_RATE: u64 = 1;

        let pending = ctx
            .accounts
            .staker
            .amount_staked
            .checked_mul(elapsed as u64)
            .unwrap_or(0)
            .checked_mul(REWARD_RATE)
            .unwrap_or(0);

        Ok(pending)
    }
}

// Moved claim_rewards logic to an internal helper function
fn claim_rewards_internal<'info>(
    amount_staked: u64,
    staker: &mut Account<'info, Staker>,
    vault_token_account: &Account<'info, TokenAccount>,
    user_token_account: &Account<'info, TokenAccount>,
    vault_authority: &Account<'info, Vault>,
    token_program: &Program<'info, Token>,
    vault_authority_bump: u8,
    staker_pubkey: Pubkey,
) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;

    let elapsed = now - staker.last_update;
    if elapsed <= 0 {
        return Ok(()); // No rewards if no time has passed
    }

    let rewards = amount_staked
        .checked_mul(APR_BASIS_POINTS)
        .ok_or(StakingError::Overflow)?
        .checked_mul(elapsed as u64)
        .ok_or(StakingError::Overflow)?
        .checked_div(SECONDS_PER_YEAR)
        .ok_or(StakingError::Underflow)?
        .checked_div(10_000) // APR in basis points
        .ok_or(StakingError::Underflow)?;

    if rewards > 0 {
        let seeds = &[VAULT_SEED, &[vault_authority_bump]];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: vault_token_account.to_account_info(),
            to: user_token_account.to_account_info(),
            authority: vault_authority.to_account_info(),
        };

        let cpi_ctx =
            CpiContext::new_with_signer(token_program.to_account_info(), cpi_accounts, signer);

        token::transfer(cpi_ctx, rewards)?;

        emit!(ClaimRewardsEvent {
            staker: staker_pubkey,
            amount: rewards,
            timestamp: now,
        });
    }

    staker.last_update = now;
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 1,
        seeds = [VAULT_SEED],
        bump,
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 8,
        seeds = [STAKER_SEED, user.key().as_ref()],
        bump,
    )]
    pub staker: Account<'info, Staker>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub staker: Account<'info, Staker>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut, has_one = user)]
    pub staker: Account<'info, Staker>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info> {
    #[account(mut, has_one = user)]
    pub staker: Account<'info, Staker>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct StakerQuery<'info> {
    #[account(mut)]
    pub staker: Account<'info, Staker>,
}

#[account]
pub struct Staker {
    pub user: Pubkey,
    pub amount_staked: u64,
    pub last_update: i64,
}

#[account]
pub struct Vault {
    pub admin: Pubkey,
    pub bump: u8,
}

#[error_code]
pub enum StakingError {
    #[msg("Insufficient staked amount.")]
    InsufficientStake,
    #[msg("Arithmetic overflow occurred.")]
    Overflow,
    #[msg("Arithmetic underflow occurred.")]
    Underflow,
    #[msg("Cannot stake zero amount.")]
    ZeroAmount,
    #[msg("Reward calculation resulted in an unexpected value.")]
    RewardCalculationError,
}

#[event]
pub struct StakeEvent {
    pub staker: Pubkey,
    pub amount: u64,
    pub total_staked: u64,
    pub timestamp: i64,
}

#[event]
pub struct UnstakeEvent {
    pub staker: Pubkey,
    pub amount: u64,
    pub total_staked: u64,
    pub timestamp: i64,
}

#[event]
pub struct ClaimRewardsEvent {
    pub staker: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}
