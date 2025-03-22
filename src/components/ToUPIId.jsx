import React from "react";
import "./SelfAccount.css"; // Custom CSS for styling
import { FaArrowLeft, FaSearch, FaEllipsisV, FaQuestionCircle } from "react-icons/fa";

const accounts = [
    { id: 1, name: "jupiter", initials: "J", upiId: "8978055697@IDB" },
    { id: 2, name: "Nisha Sharma", initials: "NS", upiId: "nishaa003@mashreq" },
    { id: 3, name: "Saroj Bala", initials: "SB", upiId: "poojabala090@Baghdad" },
    { id: 4, name: "Nineveh Imports ", initials: "TM", upiId: "ninveniexports@National" },
];

const ToUpiID = () => {
    const getBackgroundColor = (initials) => {
        const colors = {
            J: "#FF5733",
            NS: "#33FF57",
            SB: "#3357FF",
            TM: "#FF33A1",
        };
        return colors[initials] || "#CCCCCC"; // Default color if initials not found
    };

    return (
        <div className="self-account-container">
            {/* <header className="header">
                <FaArrowLeft className="icon" />
                <h2>Transfer Money</h2>
                <FaQuestionCircle className="icon" />
            </header> */}

            {/* <div className="search-bar">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search Bank Account, UPI ID" />
            </div> */}

            <div className="account-list">
                {accounts.map((account) => (
                    <div key={account.id} className="account-item">
                        <div
                            className="account-icon icon-circle"
                            style={{ backgroundColor: getBackgroundColor(account.initials) }}
                        >
                            {account.initials}
                        </div>
                        <div className="account-details flex-column">
                            <h4 style={{fontSize:"18px"}}>{account.name}</h4>
                            <p className="m-0" style={{fontSize:"14px"}}>{account.upiId}</p>
                        </div>
                        <FaEllipsisV className="more-options" />
                    </div>
                ))}
            </div>

            <button className="add-bank-btn">ADD UPI ID</button>

            {/* <footer className="footer">
                <img src="/zadpay" alt="UPI Logo" />
            </footer> */}
        </div>
    );
};

export default ToUpiID;
