import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN, Idl } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { IDL } from "../idl/staking";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";

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

export const getVaultTokenAccount = async (tokenMint: PublicKey) => {
  const [vaultPDA] = getVaultPDA();
  return getAssociatedTokenAddress(tokenMint, vaultPDA, true);
};

export const createVaultTokenAccount = async (
  connection: Connection,
  wallet: any,
  tokenMint: PublicKey
) => {
  const [vaultPDA] = getVaultPDA();
  const vaultTokenAccount = await getVaultTokenAccount(tokenMint);
  
  try {
    // Check if the token account already exists
    const accountInfo = await connection.getAccountInfo(vaultTokenAccount);
    if (accountInfo) {
      console.log("Vault token account already exists");
      return vaultTokenAccount;
    }
    
    // Create the associated token account
    const createAtaIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      vaultTokenAccount,
      vaultPDA,
      tokenMint,
      TOKEN_PROGRAM_ID
    );
    
    const transaction = new Transaction().add(createAtaIx);
    
    // Use the provider to send the transaction
    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    
    const signature = await provider.sendAndConfirm(transaction);
    
    console.log("Vault token account created:", vaultTokenAccount.toString());
    return vaultTokenAccount;
  } catch (error) {
    console.error("Error creating vault token account:", error);
    throw error;
  }
};

export const initializeUser = async (
  program: Program,
  wallet: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  
  try {
    const tx = await program.methods
      .initializeUser()
      .accounts({
        staker: stakerPDA,
        user: wallet,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    
    return tx;
  } catch (error) {
    console.error("Error initializing user:", error);
    throw error;
  }
};

export const checkIfUserInitialized = async (
  program: Program,
  wallet: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  
  try {
    await program.account.staker.fetch(stakerPDA);
    return true;
  } catch (error) {
    return false;
  }
};

export const initializeVault = async (
  program: Program,
  wallet: PublicKey
) => {
  const [vaultPDA] = getVaultPDA();
  
  try {
    const tx = await program.methods
      .initialize()
      .accounts({
        vault: vaultPDA,
        owner: wallet,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    
    return tx;
  } catch (error) {
    console.error("Error initializing vault:", error);
    throw error;
  }
};

export const checkIfVaultInitialized = async (
  program: Program,
) => {
  const [vaultPDA] = getVaultPDA();
  
  try {
    await program.account.vault.fetch(vaultPDA);
    return true;
  } catch (error) {
    return false;
  }
};

export const stakeTokens = async (
  program: Program,
  wallet: PublicKey,
  amount: number,
  tokenMint: PublicKey,
  userTokenAccount: PublicKey,
  connection: Connection,
  walletAdapter: any
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  
  try {
    // Check if vault is initialized, if not, initialize it first
    const isVaultInitialized = await checkIfVaultInitialized(program);
    if (!isVaultInitialized) {
      console.log("Vault not initialized, initializing first...");
      await initializeVault(program, wallet);
    }
    
    // Check if user is initialized, if not, initialize them first
    const isInitialized = await checkIfUserInitialized(program, wallet);
    if (!isInitialized) {
      console.log("User not initialized, initializing first...");
      await initializeUser(program, wallet);
    }
    
    // Get or create vault token account
    const vaultTokenAccount = await createVaultTokenAccount(connection, walletAdapter, tokenMint);
    
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
  connection: Connection
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  const [vaultPDA] = getVaultPDA();
  
  try {
    // Check if vault is initialized
    const isVaultInitialized = await checkIfVaultInitialized(program);
    if (!isVaultInitialized) {
      throw new Error("Vault not initialized. Please contact the administrator.");
    }
    
    // Check if user is initialized
    const isInitialized = await checkIfUserInitialized(program, wallet);
    if (!isInitialized) {
      throw new Error("User not initialized. Please stake tokens first.");
    }
    
    // Get vault token account
    const vaultTokenAccount = await getVaultTokenAccount(tokenMint);
    
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
  connection: Connection
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  const [vaultPDA] = getVaultPDA();
  
  try {
    // Check if vault is initialized
    const isVaultInitialized = await checkIfVaultInitialized(program);
    if (!isVaultInitialized) {
      throw new Error("Vault not initialized. Please contact the administrator.");
    }
    
    // Check if user is initialized
    const isInitialized = await checkIfUserInitialized(program, wallet);
    if (!isInitialized) {
      throw new Error("User not initialized. Please stake tokens first.");
    }
    
    // Get vault token account
    const vaultTokenAccount = await getVaultTokenAccount(tokenMint);
    
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
    // Fetch the staker account directly
    const stakerAccount = await program.account.staker.fetch(stakerPDA);
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - stakerAccount.lastUpdate.toNumber();
    
    // Use the same constants as the Rust program
    const APR_BASIS_POINTS = 1000; // 10% APR in basis points
    const SECONDS_PER_YEAR = 31_536_000;
    
    if (elapsed <= 0) {
      return 0; // No rewards if no time has passed
    }
    
    // Calculate pending rewards using the same logic as the Rust claim_rewards_internal function
    const rewards = stakerAccount.amountStaked
      .mul(new BN(APR_BASIS_POINTS))
      .mul(new BN(elapsed))
      .div(new BN(SECONDS_PER_YEAR))
      .div(new BN(10_000)); // APR in basis points
    
    return rewards.toNumber();
  } catch (error) {
    console.error("Error getting pending rewards:", error);
    // Return 0 if there's an error (e.g., account doesn't exist)
    return 0;
  }
};

export const getStakedAmount = async (
  program: Program,
  wallet: PublicKey
) => {
  const [stakerPDA] = getStakerPDA(wallet);
  
  try {
    const stakerAccount = await program.account.staker.fetch(stakerPDA);
    return stakerAccount.amountStaked.toNumber();
  } catch (error) {
    console.error("Error getting staked amount:", error);
    // Return 0 if there's an error (e.g., account doesn't exist)
    return 0;
  }
}; 