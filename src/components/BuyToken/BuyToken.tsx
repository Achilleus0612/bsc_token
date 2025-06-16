import React, { useState } from "react";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { mintTokens, getMintProgram } from "../../lib/mint";

declare global {
  interface Window {
    solana: any;
  }
}

const TOKEN_MINT = new PublicKey("Grg2fAdyyn5svZyJdGBTeXDeddYMGwHYMzcVTYtkyNsH"); // Replace with your token mint address
const VAULT_TOKEN_ACCOUNT = new PublicKey("B848Q6vgD7poDSsbj7VcEvQPiuWRccuAhwcEKctNfdtw"); // Replace with your vault token account

const BuyToken: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const { publicKey, connected } = useWallet();
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const handleBuyToken = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }
    if (amount <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }
    const program = getMintProgram(connection, window.solana);
    try {
      await mintTokens(program, publicKey, amount);
      toast.success("Token Minting initiated!");
    } catch (error: any) {
      toast.warning(error?.message || "An error occurred during minting");
    }
    // TODO: Implement token Buying logic here
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
