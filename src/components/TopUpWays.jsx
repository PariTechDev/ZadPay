import React, { useState, useEffect } from "react";
import "./TopUpWays.css";
import { FaTimes, FaCheckCircle, FaRegCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";
import UPIPinEntry from "./UPIPinEntry"; // Import UPIPinEntry component
import PaymentSuccess from "./PaymentSuccess"; // Import PaymentSuccess component
import TransactionLoader from "./TransactionLoader"; // Import TransactionLoader component



const topupOptions = {
  recommended: {
    bank: "IDB Bank Iraq",
    account: "** 4873",
    logo: "/idb.png",
    upi: true,
  },
  otherBanks: [
    { bank: "Byblos Bank", account: "** 7460", logo: "/byblos.png", upi: true },
    { bank: "Mashreq Bank", account: "** XX62", logo: "/mashreq.png", upi: true },
    { bank: "National Bank Iraq", account: "** 1522", logo: "/nationalbank.png", upi: true },
  ],
  creditCards: [{ bank: "IDB Bank Credit Card", account: "** 9061", logo: "/idb.png", type: "mastercard" }],
};

const TopUpWays = ({ amount, onClose, onPayClick }) => {
  const [selected, setSelected] = useState(topupOptions.recommended.account);
  const [upiId, setUpiId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showUPIPinEntry, setShowUPIPinEntry] = useState(false); // State to show/hide UPIPinEntry
  const [voucherNumber, setVoucherNumber] = useState("");
  const [voucherPin, setVoucherPin] = useState("");
  const [voucherValid, setVoucherValid] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false); // State to show PaymentSuccess
  const [isLoading, setIsLoading] = useState(false); // State to show loader
  const [showTransactionLoader, setShowTransactionLoader] = useState(false); // State to show TransactionLoader

  useEffect(() => {
    console.log("useEffect - isLoading:", isLoading);
    console.log("useEffect - showPaymentSuccess:", showPaymentSuccess);
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowPaymentSuccess(true);
        console.log("Loader finished, showing PaymentSuccess");
      }, 2000); // Set loader for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleVerifyClick = () => {
    if (isVerified) {
      setIsVerified(false);
      setUpiId("");
    } else {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
      }, 1500);
    }
  };

  const handlePayClick = () => {
    console.log("Pay button clicked");
     // Add debugger statement here
    onPayClick();
    setIsLoading(true); // Ensure loading state is set
  };

  const handleVoucherValidation = () => {
    console.log("Voucher validation started");
    if (voucherNumber === "123456" && voucherPin === "123456") {
      setVoucherValid(true);
      console.log("Voucher validated successfully");
    } else {
      setVoucherValid(false);
    }
  };

  const renderOption = (option, isSelected) => (
    <div
      key={option.account}
      className={`topup-option ${isSelected ? "selected" : ""}`}
      data-clickable="true" onClick={() => setSelected(option.account)}
    >
      <img src={option.logo} alt="Bank" className="bank-logo" />
      <div className="bank-details">
        <p className="bank-name mb-2">{option.bank}</p>
        <p className="account m-0">{option.account} {option.upi}</p>
      </div>
      <p className="amount">${amount}</p>
      {isSelected ? <FaCheckCircle className="check-icon" /> : <FaRegCircle className="radio-icon" />}
    </div>
  );

  return (
    <div className="topup-container">
      {showTransactionLoader && <TransactionLoader />}
      {!showTransactionLoader && showPaymentSuccess && <PaymentSuccess />}
      {!showTransactionLoader && !showPaymentSuccess && !showUPIPinEntry && (
        <>
          <div className="topup-header">
            <h2 style={{ fontSize: "16px" }} className="m-0">Total payable </h2>
            <span className="amount d-flex align-items-center gap-3">
              ${amount} 
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                <FaTimes className="close-icon" style={{ fontWeight: "normal", fontSize: "16px", color: "#9b6ef3" }} data-clickable="true" onClick={onClose} />
              </span>
            </span>
          </div>

          {/* Recommended */}
          <div className="topup-section">
            <h4>Recommended</h4>
            {renderOption(topupOptions.recommended, selected === topupOptions.recommended.account)}
          </div>

          {/* Other Bank Accounts */}
          <div className="topup-section">
            <div className="section-header">
              <h4>Other bank accounts</h4>
            </div>
            {topupOptions.otherBanks.map((bank) => renderOption(bank, selected === bank.account))}
            <button className="self-buttons">Add New Bank</button>
          </div>

          {/* Credit/Debit Cards */}
          <div className="topup-section">
            <div className="section-header">
              <h4>Credit/Debit cards</h4>
            </div>
            {topupOptions.creditCards.map((card) => renderOption(card, selected === card.account))}
            <button className="self-buttons">Add New Credit / Debit Card</button>
          </div>

          {/* Vendor Links */}
          <div className="topup-section">
            <h4>Request From UPI-ID</h4>
            <div className="vendor-search-container">
              <div className="input-with-icon" data-clickable="true" >
                <input data-clickable="true" 
                  type="text"
                  className="vendor-search d-flex"
                  placeholder="Enter UPI ID : 123456789icici@ybl"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  disabled={isVerified}
                  style={{ '::placeholder': { color: '#a061e6' } }}
                />
                {isVerifying && <FaSpinner className="spinner-icon" />}
                {isVerified && <FaCheckCircle className="verified-icon" />}
              </div>
            </div>
            <button
              className="verify-upi-btn"
              data-clickable="true" onClick={handleVerifyClick}
              disabled={!upiId && !isVerified || isVerifying}
            >
              {isVerified ? "Change UPI ID" : "Verify UPI ID"}
            </button>
          </div>
          
          {/* Gift Voucher Links */}
          <div className="topup-section">
            <h4>Add from Gift-Voucher</h4>
            <div className="vendor-search-container">
              <label htmlFor="gift-card-number">Voucher Number</label>
              <div className="input-with-icon d-flex justify-content-center align-items-center">
                <input data-clickable="true" 
                  type="text"
                  id="gift-card-number"
                  className="voucher-input"
                  placeholder="Enter Voucher Number"
                  value={voucherNumber}
                  onChange={(e) => setVoucherNumber(e.target.value)}
                  style={{ '::placeholder': { color: '#a061e6' } }}
                />
                {voucherValid === false && <FaTimesCircle className="error-icon" />}
                {voucherValid === true && <FaCheckCircle className="success-icon" />}
              </div>
            </div>
            <div className="vendor-search-container">
              <label htmlFor="pin">Pin</label>
              <div className="input-with-icon d-flex justify-content-center align-items-center">
                <input data-clickable="true" 
                  type="password"
                  id="pin"
                  className="voucher-input"
                  placeholder="Enter Pin"
                  value={voucherPin}
                  onChange={(e) => setVoucherPin(e.target.value)}
                  style={{ '::placeholder': { color: '#a061e6' } }}
                />
                {voucherValid === false && <FaTimesCircle className="error-icon" />}
                {voucherValid === true && <FaCheckCircle className="success-icon" />}
              </div>
            </div>
            <div className="voucher-buttons">
              <button className="cancel_btn" data-clickable="true" onClick={() => { setVoucherNumber(""); setVoucherPin(""); setVoucherValid(null); }}>Cancel</button>
              <button className="confirm_btn" data-clickable="true" onClick={handleVoucherValidation} disabled={voucherValid === false}>Confirm</button>
            </div>
          </div>

          <p className="text-center py-4 glitter_text m-0 ">Loading More Ways soon..!</p>

          {/* Pay Button */}
          <button className="pay-button mt-0" data-clickable="true" onClick={handlePayClick}>Add ${amount}</button>
        </>
      )}

      {/* Render UPIPinEntry component */}
      {!showTransactionLoader && !showPaymentSuccess && showUPIPinEntry && <UPIPinEntry />}

      {/* Render PaymentSuccess component */}
      {!showTransactionLoader && showPaymentSuccess && <PaymentSuccess />}
    </div>
  );
};

export default TopUpWays;
