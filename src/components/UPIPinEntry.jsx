import React, { useState, useEffect } from "react";
import "./UPIPinEntry.css";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import CustomAlert from "./CustomAlert"; // Import CustomAlert component
import TransactionLoader from "./TransactionLoader"; // Import TransactionLoader component
import PaymentSuccess from "./PaymentSuccess"; // Import PaymentSuccess component

const UPIPinEntry = ({ onClose, onTransactionComplete }) => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [showPin, setShowPin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false); // State to show PaymentSuccess
  const [currentDate, setCurrentDate] = useState(""); // State to store current date

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowPaymentSuccess(true);
      }, 2000); // Set loader for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setCurrentDate(formattedDate);
  }, []);

  const handlePinChange = (index, value) => {
    if (isNaN(value)) return;
    let newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < pin.length - 1) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleDelete = () => {
    let newPin = [...pin];
    let lastFilledIndex = newPin.findIndex((d) => d === "");
    if (lastFilledIndex === -1) lastFilledIndex = pin.length - 1;
    else lastFilledIndex -= 1;
    if (lastFilledIndex >= 0) {
      newPin[lastFilledIndex] = "";
      setPin(newPin);
      document.getElementById(`pin-${lastFilledIndex}`).focus();
    }
  };

  const handleClear = () => {
    setPin(["", "", "", "", "", ""]);
    document.activeElement.blur();
  };

  const handleClose = () => {
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleConfirmClose = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  const handleSubmit = () => {
    if (isPinComplete) {
      if (pin.join("") === "123456") {
        setLoading(true);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setPin(["", "", "", "", "", ""]);
      }
    }
  };

  if (showPaymentSuccess) {
    return (
      <TransactionLoader
        amount={2000}
        onTransactionComplete={onTransactionComplete}
      />
    )
  }

  if (loading) {
    return <TransactionLoader onTransactionComplete={onTransactionComplete} />;
  }

  return (
    <div className="upi-container">
      {/* Header */}

      <div
        className="d-flex flex-column w-100 upi-head"
        style={{ backgroundColor: "#662d91" }}
      >
        <div className="user_prof d-flex justify-content-between align-items-center">
          <img
            src="/idb.png"
            alt="UPI Logo"
            className="upi-logo-pin"
          />
          <div style={{ textAlign: "right" }}>
            <p className="upi-title m-0">IDB Bank Iraq Bank</p>
            <p className="upi-title m-0 text-right" style={{color:"#a363eb"}}>**** 4873</p>
          </div>
        </div>
        <hr style={{margin:"5px 0px"}} />
        <div className="user_trans">
          <div className=" d-flex justify-content-between align-items-center mb-2">
            <p className="upi-title m-0">To:</p>
            <p className="m-0">My Zad Wallet</p>
          </div>

          <div className=" d-flex justify-content-between align-items-center">
            <p className="upi-title m-0">Sending:</p>
            <p className="m-0" style={{color:"#a363eb"}}>$2000</p>
          </div>
        </div>
      </div>

      {/* PIN Entry Section */}
      <div className="upi-pin-section">
        <label className="upi-label">ENTER 6-DIGIT UPI PIN</label>
      </div>

      {/* PIN Input */}
      <div className={`upi-pin-input ${shake ? "shake" : ""}`}>
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type={showPin ? "text" : "password"}
            maxLength="1"
            value={digit}
            onChange={(e) => handlePinChange(index, e.target.value)} data-clickable="true"
          />
        ))}
      </div>

      <div className="toggle_pin my-4">
        <button className="show-pin-btn" data-clickable="true" onClick={() => setShowPin(!showPin)}>
          {showPin ? <FaEyeSlash /> : <FaEye />} SHOW
        </button>
      </div>

      {/* Numeric Keypad */}
      <div className="upi-keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "DELETE", 0, "CLEAR"].map((key, index) => (
          <button
            key={index}
            className="keypad-button"
            style={key === "DELETE" ? { fontSize: "14px" } : {}}
            data-clickable="true" onClick={() => {
              if (typeof key === "number") {
                let newPin = [...pin];
                let emptyIndex = newPin.findIndex((d) => d === "");
                if (emptyIndex !== -1) {
                  newPin[emptyIndex] = key;
                  setPin(newPin);
                }
              } else if (key === "SUBMIT") {
                handleSubmit();
              } else if (key === "DELETE") {
                handleDelete();
              } else if (key === "CLEAR") {
                handleClear();
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <button
        className={`submit-btn ${isPinComplete ? "enabled" : ""}`}
        disabled={!isPinComplete}
        onClick={handleSubmit} data-clickable="true"
      >
        Submit
      </button>
      <button className="pin-cancel-btn mt-4 w-80" onClick={handleClose} data-clickable="true">
        <FaTimes /> Cancel Transaction
      </button>

      {/* Alert Box */}
      {showAlert && (
        <CustomAlert
          message="Do you really want to cancel this transaction?"
          onApprove={handleConfirmClose}
          onSkip={handleAlertClose}
          onClose={handleAlertClose}
          onNo={handleAlertClose}
          showApprove={true}
          showSkip={false}
          showClose={false}
          showYes={false}
          showNo={true}
        />
      )}

      {/* Success Alert Box */}
      {showSuccessAlert && (
        <CustomAlert
          message="Transaction cancelled successfully."
          onClose={handleSuccessAlertClose}
          showClose={true}
        />
      )}
    </div>
  );
};

export default UPIPinEntry;
