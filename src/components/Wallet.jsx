import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faQuestionCircle,
  faAngleRight,
  faHistory,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import TopUpWays from "./TopUpWays"; // Import TopUpWays component
import UPIPinEntry from "./UPIPinEntry"; // Import UPIPinEntry component
import "./Wallet.css";

const Wallet = ({ onClose = () => {} }) => { // Set default value for onClose
  const location = useLocation(); // Initialize useLocation
  const navigate = useNavigate(); // Initialize useNavigate
  const [balance, setBalance] = useState(0);
  const [topupAmount, setTopupAmount] = useState("");
  const [showTopUpWays, setShowTopUpWays] = useState(false); // State to show/hide TopUpWays
  const [showUPIPinEntry, setShowUPIPinEntry] = useState(false); // State to show/hide UPIPinEntry

  useEffect(() => {
    if (location.state && location.state.updatedBalance) {
      setBalance(location.state.updatedBalance); // Set the updated balance from state
    }
  }, [location.state]);
  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("walletBalance"));
    const validBalance = isNaN(storedBalance) ? 0 : storedBalance;
  
    localStorage.setItem("walletBalance", validBalance); // Always default to 0 if invalid
    setBalance(validBalance);
  }, []);
  
  

  const handleTopup = () => {
    setShowTopUpWays(true);
  };

  const handleRecommendedAmountClick = (amount) => {
    setTopupAmount(amount.toString());
  };

  const handleBackClick = () => {
    navigate("/home", { replace: true });
    window.location.reload(); // Ensure the page reloads to reflect the navigation
  };

  const handlePayClick = () => {
    setShowUPIPinEntry(true);
  };

  const handleTransactionComplete = (newBalance) => {
    setBalance(newBalance);
    setShowUPIPinEntry(false);
    setShowTopUpWays(false);
  };

  return (
    <div className="wallet-container">
      {!showTopUpWays && !showUPIPinEntry && (
        <>
         <div className="p-3">
           {/* Header */}
           <div className="wallet-header">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="icon"
              data-clickable="true" onClick={handleBackClick}
            />
            <h2 className="wallet-title">ZadPay Wallet</h2>
            <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
          </div>

          {/* Wallet Banner */}
          <div className="wallet-banner">
            <div className="banner-content">
              <p className="wallet-title">One Wallet For Every QR Code!</p>
              <p className="wallet-subtitle">
                Now scan any UPI QR code & pay directly with your ZadPay Wallet.
              </p>
              <button className="upgrade-btn">Upgrade Wallet &rsaquo;</button>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="wallet-balance">
            <h1
              className="balance-amount"
              style={{ color: balance > 100 ? "green" : "#e9695b" }}
            >
              ${balance.toFixed(2)}
            </h1>
          </div>

          {/* Topup Wallet Section */}
          <div className="topup-section">
            <p className="topup-title">Topup Wallet</p>
            <div className="topup-box" data-clickable="true" >
              <span>$</span>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="recommended-amounts">
              <button data-clickable="true" onClick={() => handleRecommendedAmountClick(1000)}>
                $1,000
              </button>
              <button data-clickable="true" onClick={() => handleRecommendedAmountClick(1500)}>
                $1,500
              </button>
              <button data-clickable="true" onClick={() => handleRecommendedAmountClick(2000)}>
                $2,000
              </button>
            </div>
            <button
              className="topup-button"
              data-clickable="true" onClick={handleTopup}
              disabled={!topupAmount || parseFloat(topupAmount) <= 0}
            >
              PROCEED TO TOPUP
            </button>
          </div>

          {/* Options */}
          <div className="wallet-options">
            <div className="option">
              <div className="auto-topup-icon">
                <FontAwesomeIcon icon={faHistory} className="option-icon" />
              </div>
              <div>
                <p className="m-0">Set Auto Top-up</p>
                <small>Never run out of balance</small>
              </div>
              <FontAwesomeIcon icon={faAngleRight} className="option-arrow" />
            </div>
            <div className="option d-flex justify-between">
              <FontAwesomeIcon
                icon={faRightLeft}
                className="option-icon"
                style={{ marginLeft: "10px" }}
              />
              <p className="m-0 p-2">Wallet Transaction History</p>
              <FontAwesomeIcon icon={faAngleRight} className="option-arrow" />
            </div>
          </div>
         </div>
        </>
      )}

      {/* Render TopUpWays component */}
      {showTopUpWays && !showUPIPinEntry && (
        <TopUpWays
          amount={topupAmount}
          onClose={() => setShowTopUpWays(false)}
          onPayClick={handlePayClick}
        />
      )}

      {/* Render UPIPinEntry component */}
      {showUPIPinEntry && (
        <UPIPinEntry
          onClose={() => setShowUPIPinEntry(false)}
          onTransactionComplete={handleTransactionComplete}
        />
      )}
    </div>
  );
};

export default Wallet;
