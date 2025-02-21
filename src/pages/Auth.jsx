import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleQuestion,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import OtpVerification from "../components/OtpVerification"; // Correct the import casing
import LoginMethods from "../components/LoginMethods"; // Correct the import path
import AlertBox from "../components/AlertBox"; // Import AlertBox component

const Auth = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [isOTPView, setIsOTPView] = useState(false);
  const [showLoginMethods, setShowLoginMethods] = useState(false); // State to show/hide LoginMethods modal
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const countryCode = "+971-";

  useEffect(() => {
    // console.log("isOTPView state changed:", isOTPView);
  }, [isOTPView]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(countryCode, "");
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);
      setIsButtonEnabled(value.length >= 10);
    }
  };

  const handleProceedClick = () => {
    if (isButtonEnabled) {
      console.log("Proceed button clicked, showing OTP view");
      setIsOTPView(true); // Show OTP verification view directly
    }
  };

  const handlePasscodeChange = (index, e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      let newPasscode = [...passcode];
      newPasscode[index] = value;
      setPasscode(newPasscode);

      // Move to the next box automatically
      if (value !== "" && index < 3) {
        document.getElementById(`passcode-${index + 1}`).focus();
      }
    }
  };

  const handlePasscodeProceed = () => {
    if (passcode.every((digit) => digit !== "")) {
      setIsOTPView(true); // Show OTP verification view
    }
  };

  const togglePasscodeVisibility = () => {
    setShowPasscode(!showPasscode);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const closeAlert = () => {
    setAlertMessage("");
  };

  return (
    <div className="auth-container">
      {isOTPView ? (
        <OtpVerification setIsOTPView={setIsOTPView} />
      ) : isLoginView ? (
        <div className="login-card">
          <div className="login-logo">
            <img src="/zad.png" width="100" alt="Zad Logo" />
          </div>

          <h4 className="mt-5 text-white">Log in to Zadpay</h4>
          <p className="text-white">
            We will create an account if you don’t have one.
          </p>

          <label
            htmlFor="mobileNumber"
            className="form-label text-start d-block text-white"
          >
            Enter mobile number
          </label>
          <div className="input-group login-input-group">
            <span className="input-group-text bg-transparent border-0">
              <img src="./flag.png" width="24" alt="India Flag" />
            </span>
            <input
              type="tel"
              id="mobileNumber"
              className="form-control login-input bg-transparent text-white border-0"
              placeholder={countryCode}
              value={countryCode + mobileNumber}
              onChange={handleInputChange}
              maxLength="15" // 5 for country code + hyphen + 10 for mobile number
            />
          </div>

          <button
            className="login-button"
            disabled={!isButtonEnabled}
            style={{
              backgroundColor: isButtonEnabled ? "#a363eb" : "#463758",
              color: isButtonEnabled ? "#fff" : "#a8a8a8",
            }}
            data-clickable="true" onClick={handleProceedClick}
          >
            <b>Proceed</b>
          </button>

          <p className="login-footer">
            By proceeding, you are agreeing to ZadPay{" "}
            {/* onClick={() => showAlert('Terms and Conditions')} */}
            <button className="link-button" ><b>Terms and Conditions</b></button> &{" "}
            {/* onClick={() => showAlert('Privacy Policy')} */}
            <button className="link-button"><b>Privacy Policy</b></button>.
          </p>
        </div>
      ) : (
        <div className="passcode-card">
          <div className="d-flex justify-content-between align-items-center text-white">
            <div>
              <button
                data-clickable="true" onClick={() => setIsLoginView(true)}
                className="passcode-back-btn"
              >
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>{" "}
              </button>
            </div>
            <div>
              <span className="text_greymain"><b>Continue with ZadPay </b></span>
            </div>
            <div>
              <span>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </span>
            </div>
          </div>

         <div className="d-flex flex-column align-items-center">
         <div className="login-logo my-3 ">
            <img src="./zadPay.png" width="100" alt="Zad Logo" />
          </div>
         <h5 className="mt-3 text-white">Verify your ZadPay Password</h5>
          <p className="text_greymain text-center">This verifies your identity and helps you securely login to ZadPay</p>
          <label htmlFor="password" className="text-white mt-4"><b>Enter 4-digit Password</b></label>
          <div className="d-flex justify-content-center w-100 position-relative mt-2 mb-4" data-clickable="true">
            {passcode.map((digit, index) => (
              <input
                key={index}
                id={`passcode-${index}`}
                type={showPasscode ? "text" : "password"}
                maxLength="1"
                className="passcode-input"
                value={digit}
                onChange={(e) => handlePasscodeChange(index, e)}
                inputMode="numeric"

              />
            ))}
            <button
              type="button"
              className="passcode-toggle-btn"
              data-clickable="true" onClick={togglePasscodeVisibility}
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
            >
              <FontAwesomeIcon icon={showPasscode ? faEyeSlash : faEye} />
            </button>
          </div>
         </div>

          <button
            className="passcode-button"
            disabled={passcode.some((digit) => digit === "")}
            style={{
              backgroundColor: passcode.every((digit) => digit !== "") ? "#a363eb" : "#463758",
              color: passcode.every((digit) => digit !== "") ? "#fff" : "#a8a8a8",
            }}
            data-clickable="true" onClick={handlePasscodeProceed}
          >
            Proceed
          </button>

          <p className="passcode-footer">
            <button
              className="passcode-footer-link"
              data-clickable="true" onClick={() => setShowLoginMethods(true)} // Show LoginMethods modal
            >
              Forgot Passcode? Try another way
            </button>
          </p>
        </div>
      )}
      {showLoginMethods && <LoginMethods onClose={() => setShowLoginMethods(false)} />} {/* Render LoginMethods modal */}
      {alertMessage && <AlertBox message={alertMessage} onClose={closeAlert} />} {/* Render AlertBox */}
    </div>
  );
};

export default Auth;
