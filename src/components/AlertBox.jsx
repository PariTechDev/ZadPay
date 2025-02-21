import React from "react";
import "./AlertBox.css";

const AlertBox = ({ message, onVerify, onSkip, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box skip-alert-box">
        <p>{message}</p>
        <div className="alert-buttons">
          <button onClick={onVerify}>Verify</button>
          <button onClick={onSkip}>Skip</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
