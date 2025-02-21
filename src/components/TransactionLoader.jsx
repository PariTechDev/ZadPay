// TransactionLoader.jsx
import React, { useEffect, useState } from "react";
import PaymentSuccess from "./PaymentSuccess"; 
import PaymentReceipt from "./PaymentReceipt"; 
import Wallet from "./Wallet"; 
import "./TransactionLoader.css";

const TransactionLoader = ({ amount, onTransactionComplete = () => {} }) => {
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
    const [showWallet, setShowWallet] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowPaymentSuccess(true), 2500);
        return () => clearTimeout(timer1);
    }, []);

    const handlePaymentSuccessComplete = () => {
        setShowPaymentSuccess(false);
        setShowPaymentReceipt(true);
    };

    const handleReceiptDone = () => {
        setShowPaymentReceipt(false);
        setShowWallet(true); // Render Wallet component directly
    };

    return (
        <div className="transaction-loader-container">
            {!showPaymentSuccess && !showPaymentReceipt && !showWallet && (
                <div className="loader-wrapper">
                    <img src={`${process.env.PUBLIC_URL}/Golden_Card.gif`} alt="Loading..." className="loader-gif" />
                    <h4 className="connection_status">Connecting Securely</h4>
                    <p className="transaction_warning">Don't click back / close the tab</p>
                </div>
            )}

            {showPaymentSuccess && (
                <PaymentSuccess
                    amount={amount}
                    date={new Date().toLocaleString()}
                    onTransactionComplete={handlePaymentSuccessComplete}
                />
            )}

            {showPaymentReceipt && (
                <PaymentReceipt
                    date={new Date().toLocaleString()}
                    onDone={handleReceiptDone}
                />
            )}

            {showWallet && <Wallet />} {/* Render Wallet directly */}
        </div>
    );
};

export default TransactionLoader;