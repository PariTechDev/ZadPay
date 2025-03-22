import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faQuestionCircle,
  faShare,
  faDownload,
  faCopy,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "./CustomAlert";
import "./ReceiveMoney.css"; // Custom styling

const ReceiveMoney = ({ onClose }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(""); // State to control alert message
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [receiveAmount, setReceiveAmount] = useState("");
  const [showReceiveOptions, setShowReceiveOptions] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [isUpiValid, setIsUpiValid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timer, setTimer] = useState(3); // State to control the timer
  

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setAlertMessage(`Copied: ${text}`);
    setShowAlert(true);
  };

  const shareQR = () => {
    setAlertMessage("Share QR functionality will be implemented here.");
    setShowAlert(true);
  };

  const downloadQR = () => {
    setAlertMessage("Download QR functionality will be implemented here.");
    setShowAlert(true);
  };

  const handleBackClick = () => {
    navigate("/home");
    onClose();
  };

  const handleRecommendedAmountClick = (amount) => {
    setReceiveAmount(amount.toString());
    localStorage.setItem("selectedAmount", amount.toString());
  };

  const handleReceiveMoneyClick = () => {
    setShowReceiveOptions(true);
    setReceiveAmount(""); // Clear the amount input
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const limitedValue = value.slice(0, 10); // Limit to 10 digits
    setMobileNumber(limitedValue);
    setIsMobileValid(limitedValue.length === 10); // Valid if exactly 10 digits
  };

  const handleUpiChange = (e) => {
    const value = e.target.value.slice(0, 18); // Limit to 18 characters
    setUpiId(value);
    setIsUpiValid(/^[\w.-]{6,}@[\w.-]+$/.test(value)); // Minimum 6 characters before @
  };

  const handleRequestClick = (type) => {
    const amountToShow = localStorage.getItem("selectedAmount") || receiveAmount; // Retrieve the amount from local storage
    setAlertMessage(`Request for the amount of Rs.${amountToShow} has been sent via ${type}.`);
    setShowReceiveOptions(false);
    setShowConfirmation(true);
    let countdown = 3;
    setTimer(countdown);
  
    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);
      if (countdown < 0) {
        clearInterval(interval);
        setShowConfirmation(false);
        setShowReceiveOptions(false);
        setReceiveAmount(""); // Reset inputs
        setMobileNumber("");
        setUpiId("");
        setIsMobileValid(false);
        setIsUpiValid(false);
      }
    }, 1000);
  };
  

  return (
    <div className="receive-money-container">
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          showClose={true}
        />
      )}
      {/* Header */}
      <div className="header_top">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="icon"
          onClick={handleBackClick}
        />
        <div className="header-text">
          <h5>Receive Money</h5>
          <p>From any UPI app</p>
        </div>
        <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
      </div>

      {/* Bank & UPI Info */}
      <div className="bank-info" style={{ marginTop: "15px" }}>
        <img
          src={process.env.PUBLIC_URL + "/idb.png"}
          alt="HDFC Bank"
          className="bank-logo"
        />
        <h6 className="m-0">IDB Bank Iraq- XX62</h6>
      </div>

      {/* QR Code Section */}
      <div className="container">
        <div className="qr-box">
          <img
            src={process.env.PUBLIC_URL + "/zadqr.png"}
            alt="QR Code"
            className="qr-img"
          />
          <div className="action-buttons">
            <button data-clickable="true" className="btn qr-btn" onClick={shareQR}>
              <FontAwesomeIcon icon={faShare} /> Share QR
            </button>
            <button data-clickable="true" className="btn qr-btn" onClick={downloadQR}>
              <FontAwesomeIcon icon={faDownload} /> Download QR
            </button>
          </div>
          {/* Receive Money Section */}
          {!showReceiveOptions && !showConfirmation && (
            <div className="receive-section">
              <p className="receive-title">Request Money</p>
              <div className="receive-box" data-clickable="true">
                <span>$</span>
                <input
                  type="tel"
                  value={receiveAmount}
                  onChange={(e) => setReceiveAmount(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter amount"
                />
              </div>
              <div className="recommended-amounts">
                <button
                  data-clickable="true"
                  onClick={() => handleRecommendedAmountClick(100)}
                >
                  $100
                </button>
                <button
                  data-clickable="true"
                  onClick={() => handleRecommendedAmountClick(1000)}
                >
                  $1,000
                </button>
                <button
                  data-clickable="true"
                  onClick={() => handleRecommendedAmountClick(1500)}
                >
                  $1,500
                </button>
                <button
                  data-clickable="true"
                  onClick={() => handleRecommendedAmountClick(2000)}
                >
                  $2,000
                </button>
              </div>
              <button
                className="receive-button"
                data-clickable="true"
                onClick={handleReceiveMoneyClick}
                disabled={!receiveAmount || parseFloat(receiveAmount) <= 0}
              >
                REQUEST MONEY
              </button>
            </div>
          )}

          {/* Receive Options */}
          {showReceiveOptions && !showConfirmation && (
            <div className="receive-options">
              <div className="input-group mb-3">
                <label className="pb-2 font-bold">From Mobile Number</label>
                <div className="input-with-button">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={handleMobileChange}
                    placeholder="Enter mobile number"
                    pattern="\d*" data-clickable="true"
                  />
                  <button
                    className="btn"
                    onClick={() => handleRequestClick("mobile number")}
                    disabled={!isMobileValid}
                    data-clickable="true"
                    style={{ backgroundColor: isMobileValid ? "#a85ef8" : "" }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label className="pb-2">From UPI ID</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    value={upiId}
                    onChange={handleUpiChange}
                    placeholder="Enter UPI ID"
                    pattern="[\w.-]+@[\w.-]+"
                    data-clickable="true"
                  />
                  <button
                    className="btn"
                    onClick={() => handleRequestClick("UPI ID")}
                    disabled={!isUpiValid}
                    style={{ backgroundColor: isUpiValid ? "#a85ef8" : "" }}
                    data-clickable="true"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>

            <p className="glitter_text mt-4 mb-0">Loading More Ways Soon.....!</p>
            </div>
          )}

          {/* Confirmation Message */}
          {showConfirmation && (
            <div className="confirmation-message mt-3">
              <p>{alertMessage}</p>
              <div className="timer-circle">
                <svg height="100" width="100">
                  <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="3" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="green"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="282.6"
                    strokeDashoffset={282.6 * (1 - (timer / 3))}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div className="timer-text">{timer >= 0 ? timer : 0}</div>
              </div>
            </div>
          )}
        </div>

        {/* UPI IDs Section */}
        <div className="upi-section">
          <h6>
            UPI IDs and Numbers <span className=" float-end">MANAGE</span>
          </h6>
          {[
            "123456789icici@idb",
            "123456789icici@ibl",
            "123456789icici@axl",
          ].map((upi, index) => (
            <div className="upi-item" key={index}>
              <span>{upi}</span>
              <FontAwesomeIcon
              data-clickable="true"
                icon={faCopy}
                className="copy-btn"
                onClick={() => copyToClipboard(upi)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceiveMoney;
