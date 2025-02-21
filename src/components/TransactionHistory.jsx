import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./TransactionHistory.css"; // CSS for styling

const transactions = [
    { id: 1, name: "Al-Rafidain Bank", initials: "RB", amount: "$586.62", bankIcon: process.env.PUBLIC_URL + "/rafidianbank.png", time: "Yesterday", color: "#FF5733" },
    { id: 2, name: "Baghdad Bazaar", initials: "BB", amount: "$544", bankIcon: process.env.PUBLIC_URL + "/byblos.png", time: "Yesterday", color: "#33FF57" },
    { id: 3, name: "Basra Gold Souq", initials: "BG", amount: "$1,500", bankIcon: process.env.PUBLIC_URL + "/rasheedbank.png", time: "Friday", color: "#3357FF" },
    { id: 4, name: "Mosul Market", initials: "MM", amount: "$15", bankIcon: process.env.PUBLIC_URL + "/bagdadh.png", time: "Friday", color: "#FF33A8" },
    { id: 5, name: "Najaf Trade Hub", initials: "NT", amount: "$80", bankIcon: process.env.PUBLIC_URL + "/zad.png", time: "Thursday", color: "#FF8C33" },
    { id: 6, name: "Karbala Mart", initials: "KM", amount: "$586.62", bankIcon: process.env.PUBLIC_URL + "/byblos.png", time: "Thursday", color: "#33FFF5" },
    { id: 7, name: "Iraq Oil Exports", initials: "IO", amount: "$544", bankIcon: process.env.PUBLIC_URL + "/zad.png", time: "Wednesday", color: "#FF5733" },
    { id: 8, name: "Kurdish Handicrafts", initials: "KH", amount: "$1,500", bankIcon: process.env.PUBLIC_URL + "/rafidianbank.png", time: "Wednesday", color: "#33FF57" },
    { id: 9, name: "Babylon Groceries", initials: "BG", amount: "$15", bankIcon: process.env.PUBLIC_URL + "/bagdadh.png", time: "Tuesday", color: "#3357FF" },
    { id: 10, name: "Tigris Fishing Co.", initials: "TF", amount: "$80", bankIcon: process.env.PUBLIC_URL + "/rasheedbank.png", time: "Tuesday", color: "#FF33A8" },
    { id: 11, name: "Euphrates Electronics", initials: "EE", amount: "$1,200", bankIcon: process.env.PUBLIC_URL + "/rasheedbank.png", time: "Monday", color: "#FF8C33" },
    { id: 12, name: "Samara Textiles", initials: "ST", amount: "$350", bankIcon: process.env.PUBLIC_URL + "/rafidianbank.png", time: "Monday", color: "#33FFF5" },
    { id: 13, name: "Babylon Carpets", initials: "BC", amount: "$275", bankIcon: process.env.PUBLIC_URL + "/bagdadh.png", time: "11-02-2024", color: "#FF5733" },
    { id: 14, name: "Al-Nasiriya Trading", initials: "AN", amount: "$999", bankIcon: process.env.PUBLIC_URL + "/zad.png", time: "11-02-2024", color: "#33FF57" },

    // Transactions from Previous Weeks with DD-MM-YYYY format
    { id: 15, name: "Iraqi Airlines", initials: "IA", amount: "$420", bankIcon: process.env.PUBLIC_URL + "/byblos.png", time: "10-02-2024", color: "#3357FF" },
    { id: 16, name: "Basra Shipping Co.", initials: "BS", amount: "$1,050", bankIcon: process.env.PUBLIC_URL + "/rafidianbank.png", time: "09-02-2024", color: "#FF33A8" },
    { id: 17, name: "Erbil Handicrafts", initials: "EH", amount: "$670", bankIcon: process.env.PUBLIC_URL + "/rasheedbank.png", time: "08-02-2024", color: "#FF8C33" },
    { id: 18, name: "Mosul Textile Factory", initials: "MT", amount: "$215", bankIcon: process.env.PUBLIC_URL + "/bagdadh.png", time: "07-02-2024", color: "#33FFF5" },
    { id: 19, name: "Karbala Spice Traders", initials: "KS", amount: "$130", bankIcon: process.env.PUBLIC_URL + "/zad.png", time: "06-02-2024", color: "#FF5733" },
    { id: 20, name: "Tigris Fresh Produce", initials: "TFP", amount: "$340", bankIcon: process.env.PUBLIC_URL + "/rafidianbank.png", time: "05-02-2024", color: "#33FF57" },
    { id: 21, name: "Al-Qasim Electronics", initials: "AQ", amount: "$780", bankIcon: process.env.PUBLIC_URL + "/rasheedbank.png", time: "04-02-2024", color: "#FF33A8" },
    { id: 22, name: "Ur Souvenirs", initials: "US", amount: "$199", bankIcon: process.env.PUBLIC_URL + "/byblos.png", time: "03-02-2024", color: "#FF8C33" },
    { id: 23, name: "Nineveh Imports", initials: "NI", amount: "$999", bankIcon: process.env.PUBLIC_URL + "/bagdadh.png", time: "02-02-2024", color: "#33FFF5" },
    { id: 24, name: "Samawa Dairy", initials: "SD", amount: "$450", bankIcon: process.env.PUBLIC_URL + "/zad.png", time: "01-02-2024", color: "#FF5733" }
];

const TransactionHistory = ({ onClose }) => {
    return (
        <div className="transaction-history-container">
            {/* Header */}
            <header className="header_top">
                <button className="back-button" data-clickable="true" onClick={onClose}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className="header-title">Transaction History</h2>
                <div className="header-icons">
                    <FontAwesomeIcon icon={faRedo} className="icon" />
                    <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
                </div>
            </header>

            {/* Search */}
            <div className="search-bar">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search by name, number or UPI ID" />
            </div>

            {/* Filters */}
            <div className="filters">
                <button className="download-btn">
                    <i className="fas fa-download"></i> Download statement
                </button>
                <button className="filter-btn">
                    <i className="fas fa-filter"></i> Filters
                </button>
            </div>

            {/* Transaction List */}
            <div className="transactions">
                {transactions.map((tx) => (
                    <div className="transaction-item" key={tx.id}>
                        <div className="left">
                            <div className="icon-circle" style={{ backgroundColor: tx.color }}>{tx.initials}</div>
                            <div className="tx-details">
                                <p className="paid-to">Paid to</p>
                                <h6>{tx.name}</h6>
                                <p className="time">{tx.time}</p>
                            </div>
                        </div>
                        <div className="right">
                            <h6>{tx.amount}</h6>
                         <div className="d-flex align-items-center justify-content-end mt-2 gap-2">
                         <small style={{fontSize:"12px",color:"#aaa"}}>Debited From</small>  <img src={tx.bankIcon} alt="Bank" className="bank-icon" />
                         </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Navigation */}
            {/* <div className="footer">
                <div className="nav-item">
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div className="nav-item qr-scan">
                    <i className="fas fa-qrcode"></i>
                </div>
                <div className="nav-item">
                    <i className="fas fa-history"></i>
                    <span>History</span>
                </div>
            </div> */}
        </div>
    );
};

export default TransactionHistory;
