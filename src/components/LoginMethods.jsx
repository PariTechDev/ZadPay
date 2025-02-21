import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCommentDots, faMobileAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const LoginMethods = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginWithAnotherAccount = () => {
    navigate("/"); // Redirect to home
  };

  const handleVerifyWithOtp = () => {
    navigate("/otp-verification"); // Redirect to OTP verification screen
  };

  const handleVerifyBySms = () => {
    navigate("/sim-selection"); // Redirect to SIM selection screen
  };

  return (
    <div className="login-methods-overlay" onClick={onClose}>
      <div className="login-methods-container login-methods-bottom" onClick={(e) => e.stopPropagation()}>
        {/* Header with Title and Close Button */}
        <div className="login-methods-header">
          <h4>Other methods to log in to your account</h4>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Login Options */}
        <div className="login-methods-option" onClick={handleVerifyWithOtp}>
          <div className="icon">
            <FontAwesomeIcon icon={faCommentDots} />
          </div>
          <span>Verify with OTP</span>
          <FontAwesomeIcon icon={faChevronRight} className="chevron" />
        </div>

        <div className="login-methods-option" onClick={handleVerifyBySms}>
          <div className="icon">
            <FontAwesomeIcon icon={faMobileAlt} />
          </div>
          <span>Verify by sending SMS</span>
          <FontAwesomeIcon icon={faChevronRight} className="chevron" />
        </div>

        {/* Bottom Link */}
        <p className="login-methods-footer">
          Or <button className="link-button" onClick={handleLoginWithAnotherAccount}>Login with another ZadPay Account</button>
        </p>
      </div>
    </div>
  );
};

export default LoginMethods;
