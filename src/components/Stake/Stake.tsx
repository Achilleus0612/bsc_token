import React, { useState } from "react";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";

const Stake: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakeDuration, setStakeDuration] = useState(30); // days
  const { connected } = useWallet();

  const handleStake = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    if (stakeAmount <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }
    // TODO: Implement staking logic here
    toast.success("Staking initiated!");
  };

  const handleUnstake = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    // TODO: Implement unstaking logic here
    toast.success("Unstaking initiated!");
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
                    <span className="value">0 BSC</span>
                  </div>
                  <div className="info-item">
                    <span>Staked Amount</span>
                    <span className="value">{stakeDuration}BSC</span>
                  </div>
                </div>

                <div className="stake-actions">
                <button
                    className="btn unstake-btn"
                    onClick={handleUnstake}
                    disabled={!connected}
                  >
                    Claim Rewards
                  </button>
                  <button
                    className="btn stake-btn"
                    onClick={handleStake}
                    disabled={!connected}
                  >
                    Stake Tokens
                  </button>
                 
                  <button
                    className="btn unstake-btn"
                    onClick={handleUnstake}
                    disabled={!connected}
                    style={{backgroundColor: "#000", color: "#fff"}}
                  >
                    Unstake Tokens
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