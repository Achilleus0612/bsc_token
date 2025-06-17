import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getStakingProgram, stakeTokens, unstakeTokens, claimRewards, getPendingRewards, getStakedAmount } from "../../lib/staking";

declare global {
  interface Window {
    solana: any;
  }
}

const TOKEN_MINT = new PublicKey("Be4J9xewbY1rRfxipv5rNuNEsFNRQ3PfrLcqSZVkVU3f"); // Replace with your token mint address

const Stake: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, connected } = useWallet();

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  useEffect(() => {
    if (connected && publicKey) {
      fetchStakingData();
    }
  }, [connected, publicKey]);

  const fetchStakingData = async () => {
    if (!publicKey) return;
    
    try {
      const program = getStakingProgram(connection, window.solana);
      const [rewards, staked] = await Promise.all([
        getPendingRewards(program, publicKey),
        getStakedAmount(program, publicKey)
      ]);
      console.log(rewards,staked,'asdfasdfsdfsdfasdfasdf')
      setPendingRewards(rewards);
      setStakedAmount(staked);
    } catch (error) {
      console.error("Error fetching staking data:", error);
    }
  };

  const handleStake = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }
    if (stakeAmount <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }

    setIsLoading(true);
    try {
      const program = getStakingProgram(connection, window.solana);
      const userTokenAccount = await connection.getTokenAccountsByOwner(publicKey, {
        mint: TOKEN_MINT,
      });

      if (userTokenAccount.value.length === 0) {
        toast.error("No token account found!");
        return;
      }

      const tx = await stakeTokens(
        program,
        publicKey,
        stakeAmount,
        TOKEN_MINT,
        userTokenAccount.value[0].pubkey,
        connection,
        window.solana
      );

      toast.success("Staking successful!");
      await fetchStakingData();
    } catch (error) {
      console.error("Error staking:", error);
      toast.error("Failed to stake tokens");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    setIsLoading(true);
    try {
      const program = getStakingProgram(connection, window.solana);
      const userTokenAccount = await connection.getTokenAccountsByOwner(publicKey, {
        mint: TOKEN_MINT,
      });

      if (userTokenAccount.value.length === 0) {
        toast.error("No token account found!");
        return;
      }

      const tx = await unstakeTokens(
        program,
        publicKey,
        stakeAmount,
        TOKEN_MINT,
        userTokenAccount.value[0].pubkey,
        connection
      );

      toast.success("Unstaking successful!");
      await fetchStakingData();
    } catch (error) {
      console.error("Error unstaking:", error);
      toast.error("Failed to unstake tokens");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    setIsLoading(true);
    try {
      const program = getStakingProgram(connection, window.solana);
      const userTokenAccount = await connection.getTokenAccountsByOwner(publicKey, {
        mint: TOKEN_MINT,
      });

      if (userTokenAccount.value.length === 0) {
        toast.error("No token account found!");
        return;
      }

      const tx = await claimRewards(
        program,
        publicKey,
        TOKEN_MINT,
        userTokenAccount.value[0].pubkey,
        connection
      );

      toast.success("Rewards claimed successfully!");
      await fetchStakingData();
    } catch (error) {
      console.error("Error claiming rewards:", error);
      toast.error("Failed to claim rewards");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="stake" className="team-area pt-100">
      <div className="container">
        <div className="section-title text-center mb-50">
          <span className="sub-title">Stake Tokens</span>
          <h2 className="title">
            Stake <span>BSC</span>
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="banner-countdown-wrap text-center">
              <div className="stake-container">
                <div className="stake-input-group">
                <span style={{marginTop: "12px"}}>Stake Amount</span>

                  <input
                    className="Buy-token-input"
                    type="number"
                    placeholder="Amount to stake"
                    value={stakeAmount}
                    onChange={(e) =>
                      Number(e.target.value) > 0 &&
                      setStakeAmount(Number(e.target.value))
                    }
                  />
                </div>

                <div className="stake-info">
                  <div className="info-item">
                    <span>APY:</span>
                    <span className="value">12%</span>
                  </div>
                  <div className="info-item">
                    <span>Rewards:</span>
                    <span className="value">{pendingRewards} BSC</span>
                  </div>
                  <div className="info-item">
                    <span>Staked Amount</span>
                    <span className="value">{stakedAmount} BSC</span>
                  </div>
                </div>

                <div className="stake-actions">
                  <button
                    className="btn"
                    onClick={handleStake}
                    disabled={!connected || isLoading}
                  >
                    {isLoading ? "Processing..." : "Stake Tokens"}
                  </button>
                  <button
                    className="btn"
                    onClick={handleUnstake}
                    disabled={!connected || isLoading}
                  >
                    {isLoading ? "Processing..." : "Unstake Tokens"}
                  </button>
                  <button
                    className="btn"
                    onClick={handleClaimRewards}
                    disabled={!connected || isLoading || pendingRewards <= 0}
                  >
                    {isLoading ? "Processing..." : "Claim Rewards"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stake; 