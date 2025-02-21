import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faQuestionCircle, faShare, faDownload, faCopy } from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "./CustomAlert";
import "./ReceiveMoney.css"; // Custom styling

const ReceiveMoney = ({ onClose }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(""); // State to control alert message
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

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
        <FontAwesomeIcon icon={faArrowLeft} className="icon" onClick={handleBackClick} />
        <div className="header-text">
          <h5>Receive Money</h5>
          <p>From any UPI app</p>
        </div>
        <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
      </div>

      {/* Bank & UPI Info */}
      <div className="bank-info" style={{marginTop: "15px"}}>
        <img src={process.env.PUBLIC_URL + "/rafidianbank.png"} alt="HDFC Bank" className="bank-logo" />
        <h6 className="m-0">Rafidian Bank - XX62</h6>
      </div>

      {/* QR Code Section */}
      <div className="container">
        <div className="qr-box">
          <img src={process.env.PUBLIC_URL + "/zadqr.png"} alt="QR Code" className="qr-img" />
          <div className="action-buttons">
            <button className="btn qr-btn" onClick={shareQR}>
              <FontAwesomeIcon icon={faShare} /> Share QR
            </button>
            <button className="btn qr-btn" onClick={downloadQR}>
              <FontAwesomeIcon icon={faDownload} /> Download QR
            </button>
          </div>
        </div>

        {/* UPI IDs Section */}
        <div className="upi-section">
          <h6>
            UPI IDs and Numbers <span className=" float-end">MANAGE</span>
          </h6>
          {["123456789icici@ybl", "123456789icici@ibl", "123456789icici@axl"].map((upi, index) => (
            <div className="upi-item" key={index}>
              <span>{upi}</span>
              <FontAwesomeIcon icon={faCopy} className="copy-btn" onClick={() => copyToClipboard(upi)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceiveMoney;
