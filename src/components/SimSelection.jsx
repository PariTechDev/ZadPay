import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleQuestion, faCheckCircle, faSimCard } from "@fortawesome/free-solid-svg-icons";
import AlertBox from "./AlertBox"; // Import the existing AlertBox component
import "./SimSelection.css"; // Import the CSS file

const SimSelection = () => {
  const [selectedSim, setSelectedSim] = useState(1); // Set SIM 1 as default
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [simNumber, setSimNumber] = useState(""); // State to store the SIM number
  const [loading, setLoading] = useState(false); // State to control loading visibility
  const [successMessage, setSuccessMessage] = useState(""); // State to control success message visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the SIM number from the state passed through the navigate function
    if (location.state && location.state.simNumber) {
      setSimNumber(location.state.simNumber);
    }
  }, [location.state]);

  const handleSimSelect = (sim) => {
    setSelectedSim(sim);
  };

  const handleSkip = () => {
    setShowAlert(true); // Show the alert box
  };

  const handleVerify = () => {
    setShowAlert(false);
    setLoading(true); // Show the loader
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        <div>
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" /> <span className="success-text">Successfully verified</span>
        </div>
      );
      setTimeout(() => {
        navigate("/home"); // Navigate to home after 2 seconds
      }, 2000);
    }, 2000); // Show loader for 2 seconds
  };

  const handleAlertSkip = () => {
    setShowAlert(false);
    setLoading(true); // Show the loader
    setTimeout(() => {
      setLoading(false);
      navigate("/home"); // Navigate to home after 2 seconds
    }, 2000); // Show loader for 2 seconds
  };

  return (
    <div className="sim-container">
      {loading && (
        <div className="page-loader">
          <div className="loader-container">
            <div className="rotating-circle"></div>
            <p>Verifying...</p>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="success-message-container">
          {successMessage}
        </div>
      )}
      {showAlert && (
        <AlertBox
          message="Kindly verify with SMS to link the bank accounts or else click on skip to proceed to ZadPay"
          onVerify={handleVerify}
          onSkip={handleAlertSkip}
          onClose={() => setShowAlert(false)}
        />
      )}
      {!loading && !successMessage && (
        <div className="sim-card">
          {/* Header with Back Button, Info Icon, and Skip Button */}
          <div className="sim-header">
            <button data-clickable="true" onClick={() => navigate(-1)} className="sim-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <span className="sim-title">Continue with Zadpay</span>
            <FontAwesomeIcon icon={faCircleQuestion} className="sim-info-icon" />
            <button data-clickable="true" onClick={handleSkip} className="sim-skip-btn" style={{ color: "#A363EB", background: "none", border: "none" }}><b>Skip</b> </button>
          </div>

          {/* Logo */}
          <div className="login-logo my-3 ">
            <img src="/zad.png" width="100" alt="Zad Logo" />
          </div>

          <h5 className="sim-heading">Verify your mobile number</h5>
          <p className="sim-subtitle">This verifies your identity and helps you securely log in to Your <b>ZadPay</b> linked <b>Bank Accounts</b>.</p>

          {/* SIM Selection Box */}
          <div className="sim-selection-box">
            <label className="sim-label">Choose SIM which belongs to <b>Bank Account</b> </label>
            <span className="sim-number">{simNumber}</span>

            {/* SMS Charges Notice */}
            <div className="sim-warning">Standard SMS charges may apply</div>

            {/* SIM Options */}
            <div
              className={`sim-option ${selectedSim === 1 ? "selected" : ""}`}
              data-clickable="true" onClick={() => handleSimSelect(1)}
            >
              <div className="sim-icon">
                <FontAwesomeIcon icon={faSimCard} size="lg" style={{ color: "#ffffff", fontSize: "26px" }} />
              </div>
              <span className={`sim-text ${selectedSim === 1 ? "text-selected" : "text-white"}`}>SIM 1 - Zain Iraq</span>
              {selectedSim === 1 && <FontAwesomeIcon icon={faCheckCircle} className="sim-check-icon" />}
            </div>

            <div
              className={`sim-option ${selectedSim === 2 ? "selected" : ""}`}
              data-clickable="true" onClick={() => handleSimSelect(2)}
            >
              <div className="sim-icon">
                <FontAwesomeIcon icon={faSimCard} size="lg" style={{ color: "#ffffff", fontSize: "26px" }} />
              </div>
              <span className={`sim-text ${selectedSim === 2 ? "text-selected" : "text-white"}`}>SIM 2 - Asiacell</span>
              {selectedSim === 2 && <FontAwesomeIcon icon={faCheckCircle} className="sim-check-icon" />}
            </div>
          </div>

          {/* Send SMS Button */}
          <button className="sim-send-btn" disabled={!selectedSim} data-clickable="true" onClick={handleVerify}>Send SMS</button>

          {/* Footer Link */}
          {/* <p className="sim-footer">
            <a href="#">Unable to send SMS? Try another way</a>
          </p> */}
        </div>
      )}
    </div>
  );
};

export default SimSelection;
