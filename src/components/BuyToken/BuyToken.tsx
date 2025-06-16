import React, { useState } from "react";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";

const BuyToken: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const { publicKey, connected } = useWallet();

  const handleBuyToken = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    if (amount <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }
    // TODO: Implement token Buying logic here
    toast.success("Token Buying initiated!");
  };

  return (
    <section id="Buytoken" className="team-area pt-100">
      <div className="container">
        <div className="section-title text-center mb-50">
          <span className="sub-title">Mint Token</span>
          <h2 className="title">
            Mint <span>BSC</span>
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="banner-countdown-wrap text-center">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <input
                  className="Buy-token-input"
                  type="number"
                  placeholder="BSC Amount"
                  value={amount}
                  onChange={(e) =>
                    Number(e.target.value) > 0 &&
                    setAmount(Number(e.target.value))
                  }
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" , marginBottom: "20px",}}>
                <button 
                  className="btn" 
                  onClick={handleBuyToken}
                  disabled={!connected}
                >
                  Mint Token
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyToken;
