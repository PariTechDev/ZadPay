import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./OtpVerification.css";

const OtpVerification = ({ setIsOTPView }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [resendMessage, setResendMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false); // State to control OTP verification
    const navigate = useNavigate();
    const correctOtp = "1234"; // Default correct OTP

    const handleBackClick = () => {
        setIsOTPView(false);
    };

    const handleOtpChange = (index, e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
            let newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next box automatically
            if (value !== "" && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            let newOtp = [...otp];
            if (otp[index] === "") {
                if (index > 0) {
                    document.getElementById(`otp-${index - 1}`).focus();
                    newOtp[index - 1] = "";
                }
            } else {
                newOtp[index] = "";
            }
            setOtp(newOtp);
        }
    };

    const handleResendClick = () => {
        if (timer > 0) {
            setErrorMessage("Can't resend until the timer expires.");
            setTimeout(() => setErrorMessage(""), 3000); // Hide message after 3 seconds
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setResendMessage("OTP has been resent successfully.");
            setTimer(60);
            setTimeout(() => setResendMessage(""), 3000); // Hide message after 3 seconds
        }, 1000); // Simulate API call
    };

    useEffect(() => {
        if (otp.every((digit) => digit !== "")) {
            const enteredOtp = otp.join("");
            if (enteredOtp === correctOtp) {
                setIsOtpVerified(true); // Set OTP verified state
                setSuccessMessage("OTP verified successfully.");
                setTimeout(() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/sim-selection");
                    }, 2000); // Show loader for 2 seconds before navigating
                }, 1000); // Show success message for 2 seconds
            } else {
                setErrorMessage("Incorrect OTP. Please try again.");
                setOtp(["", "", "", ""]); // Reset OTP input boxes
                document.getElementById('otp-0').focus(); // Set focus to the first input box
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000); // Hide message after 3 seconds
            }
        }
    }, [otp, navigate]);

    useEffect(() => {
        if (timer > 0 && !isOtpVerified) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, isOtpVerified]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };

    return (
        <div className="otp-container">
            {loading && <div className="page-loader"><div className="loader-container"><div className="rotating-circle"></div></div></div>}
            <div className="otp-card">
                <button className="otp-back-btn" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="otp-logo">
                    <img src="./zad.png" width="100" alt="Zad Logo" />
                </div>
                <h4 className="otp-title">Enter OTP</h4>
                <p className="otp-subtitle">We have sent an OTP to your mobile number</p>
                <div className="otp-boxes">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            className="otp-input"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            inputMode="numeric"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck="false"
                        />
                    ))}
                </div>
                {!isOtpVerified && timer > 0 && (
                    <div className="otp-timer">
                        <div className="otp-timer-animation"></div>
                        <span>Auto Reading <b>OTP - {formatTime(timer)} </b></span>
                    </div>
                )}
                {!isOtpVerified && (
                    <p className="otp-footer">
                        Didn't receive the OTP? <button className="resend-button" onClick={handleResendClick}><b>Resend OTP</b></button>
                    </p>
                )}
                {resendMessage && <p className="resend-message">{resendMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && (
                    <div className="success-message-container">
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                        <p className="success-message mb-0">{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OtpVerification;
