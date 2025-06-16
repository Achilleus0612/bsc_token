import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN, Idl } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { IDL } from "../idl/token";
import { getAssociatedTokenAddress } from "@solana/spl-token";

export const MINT_PROGRAM_ID = new PublicKey("6KeD6ZSfzE26E2c7mUekC64P3LMcCB1iM9xMgT518UuN");
export const MINT_TOKEN = new PublicKey("Be4J9xewbY1rRfxipv5rNuNEsFNRQ3PfrLcqSZVkVU3f");

export const getMintProgram = (connection: Connection, wallet: any) => {
    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    return new Program(IDL as unknown as Idl, MINT_PROGRAM_ID, provider);
};

export const getTokenStatePDA = () => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from('token_state')],
        MINT_PROGRAM_ID
    );
};

export const getUserAccount = (wallet: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("user"), wallet.toBuffer()],
        MINT_PROGRAM_ID
    );
};

export const getUserTokenAccount = async (wallet: PublicKey) => {
    const userTokenAccount = await getAssociatedTokenAddress(
        MINT_TOKEN,
        wallet,
        false // allowOwnerOffCurve = false unless you're using a PDA wallet
    );
    return userTokenAccount;
};

export const mintTokens = async (
    program: Program,
    wallet: PublicKey,
    amount: number,
) => {
    const [userAccountPDA] = getUserAccount(wallet);
    const [tokenStatePDA] = getTokenStatePDA();
    const userTokenAccount = await getUserTokenAccount(wallet);

    console.log(userAccountPDA.toBase58(), tokenStatePDA.toBase58(), userTokenAccount.toBase58());

    try {
        const tx = await program.methods
            .mint(new BN(amount * 10 ** 6))
            .accounts({
                mint: MINT_PROGRAM_ID,
                userTokenAccount: userTokenAccount,
                userAccount: userAccountPDA,
                tokenState: tokenStatePDA,
                owner: wallet,
                systemProgram: SystemProgram.programId,
            })
            .rpc();

        return tx;
    } catch (error) {
        console.error("Error staking tokens:", error);
        throw error;
    }
};