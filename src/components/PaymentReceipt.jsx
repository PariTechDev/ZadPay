// PaymentReceipt.jsx
import React, { useState } from "react";
import { FaUser, FaEye, FaShareAlt } from "react-icons/fa";
import "./PaymentReceipt.css";
import AlertBox from "./AlertBox";

const PaymentReceipt = ({ date, onDone }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleHomeClick = () => {
    if (typeof onDone === 'function') {
      onDone(); // This will trigger setActiveComponent(null) in Home
    } else {
      window.location.href = "/home"; // Fallback in case onDone isn't passed
    }
  };
  

  const handleViewReceiptClick = () => {
    setAlertMessage("Viewing the receipt...");
    setShowAlert(true);
  };

  const handleViewDetailsClick = () => {
    setAlertMessage("Viewing the details...");
    setShowAlert(true);
  };

  const handleAlertClose = () => setShowAlert(false);

  return (
    <div className="payment-receipt">
      <div className="success-section">
        <img src={`${process.env.PUBLIC_URL}/Successfully_Done.gif`} alt="Success" className="checkmark-icon" />
        <h2 className="payment-text">Payment Successful</h2>
        <p className="payment-time">{date}</p>
      </div>

      <div className="transaction-box py-3">
        <div className="transacr_details">
          <div className="user_logo">
           <div>
           <FaUser className="user-icon" style={{ fontSize: "20px" }} />
           </div>
          </div>
          <div className="user-section">
            <h3 className="username mb-2">Iraqi Airlines</h3>
            <p className="user-number m-0">+971-6889789799</p>
          </div>
          <div className="amount-section text-right">
            <h2 className="tit">Paid</h2>
            <h3 className="bill_amount m-0">$2000</h3>
          </div>
        </div>

        <hr />

        <div className="transaction-actions">
          <button className="action-btn styled-btn" >
            <FaEye className="action-icon" />
            <p className="m-0">View Details</p>
          </button>
          <button className="action-btn styled-btn" >
            <FaShareAlt className="action-icon" />
            <p className="m-0">Share Receipt</p>
          </button>
        </div>
      </div>

      <div className="receipt-footer" >
        <button className="done-button" data-clickable="true" onClick={handleHomeClick}>DONE</button>
      </div>

      {showAlert && (
        <AlertBox
          message={alertMessage}
          onVerify={handleAlertClose}
          onSkip={handleAlertClose}
          onClose={handleAlertClose || (() => {})} // Ensure onClose is always a function
        />
      )}
    </div>
  );
};

export default PaymentReceipt;