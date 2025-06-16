import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN, Idl } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { IDL } from "../idl/staking";

export const STAKING_PROGRAM_ID = new PublicKey("9Z8DPy12nRaxMhKAmrCcXKAWKGyUwpkZLwpBG592AcWv");

export const getStakingProgram = (connection: Connection, wallet: any) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  return new Program(IDL as unknown as Idl, STAKING_PROGRAM_ID, provider);
};

export const getStakerPDA = (wallet: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("staker"), wallet.toBuffer()],
    STAKING_PROGRAM_ID
  );
};

export const getVaultPDA = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    STAKING_PROGRAM_ID
  );
};

export const stakeTokens = async (
  program: Program,
  wallet: PublicKey,
  amount: number,
  tokenMint: PublicKey,
  userTokenAccount: PublicKey,
  vaultTokenAccount: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  
  try {
    const tx = await program.methods
      .stake(new BN(amount))
      .accounts({
        user: wallet,
        staker: stakerPDA,
        userTokenAccount,
        vaultTokenAccount,
        tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    
    return tx;
  } catch (error) {
    console.error("Error staking tokens:", error);
    throw error;
  }
};

export const unstakeTokens = async (
  program: Program,
  wallet: PublicKey,
  amount: number,
  tokenMint: PublicKey,
  userTokenAccount: PublicKey,
  vaultTokenAccount: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  const [vaultPDA] = getVaultPDA();
  
  try {
    const tx = await program.methods
      .unstake(new BN(amount))
      .accounts({
        staker: stakerPDA,
        user: wallet,
        userTokenAccount,
        vaultTokenAccount,
        vault: vaultPDA,
        tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    
    return tx;
  } catch (error) {
    console.error("Error unstaking tokens:", error);
    throw error;
  }
};

export const claimRewards = async (
  program: Program,
  wallet: PublicKey,
  tokenMint: PublicKey,
  userTokenAccount: PublicKey,
  vaultTokenAccount: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  const [vaultPDA] = getVaultPDA();
  
  try {
    const tx = await program.methods
      .claimRewards()
      .accounts({
        staker: stakerPDA,
        user: wallet,
        userTokenAccount,
        vaultTokenAccount,
        vault: vaultPDA,
        tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      })
      .rpc();
    
    return tx;
  } catch (error) {
    console.error("Error claiming rewards:", error);
    throw error;
  }
};

export const getPendingRewards = async (
  program: Program,
  wallet: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  
  try {
    const rewards = await program.methods
      .getPendingRewards()
      .accounts({
        staker: stakerPDA,
      })
      .view();
    
    return rewards;
  } catch (error) {
    console.error("Error getting pending rewards:", error);
    throw error;
  }
}; 