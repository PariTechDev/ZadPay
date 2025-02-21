// PaymentSuccess.jsx
import React, { useEffect } from "react";
import "./PaymentSuccess.css";

const PaymentSuccess = ({ date, amount, onTransactionComplete = () => {} }) => {
    useEffect(() => {
        const currentBalance = parseFloat(localStorage.getItem("walletBalance")) || 0;
        const newBalance = currentBalance + amount;
        localStorage.setItem("walletBalance", newBalance);

        const timer = setTimeout(() => {
            if (typeof onTransactionComplete === 'function') {
                onTransactionComplete(newBalance);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [amount, onTransactionComplete]);

    return (
        <div className="payment-success-container">
            <div className="checkmark-wrapper">
                <img src="/Successfully_Done.gif" alt="Success" className="checkmark-icon" />
            </div>
            <h2 className="payment-text">Payment Successful</h2>
            <p className="payment-time">{date}</p>
        </div>
    );
};

export default PaymentSuccess;