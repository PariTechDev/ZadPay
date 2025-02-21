import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRedo,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./TransferMoney.css";
import { FaSearch } from "react-icons/fa";
import TOUPIID from "./ToUPIId"; // Import the TOUPIID component

const bankAccounts = [
  {
    name: "Reena",
    bank: "Rafidain Bank",
    account: "••5914",
    amount: "$3,030",
    date: "22 Jan 2024",
    logo: process.env.PUBLIC_URL + "/rafidianbank.png",
  },
  {
    name: "Said",
    bank: "Rasheed Bank",
    account: "••3738",
    amount: "$15,050",
    date: "07 Jan 2025",
    logo: process.env.PUBLIC_URL + "/rasheedbank.png",
  },
  {
    name: "jalhahal",
    bank: "Bank of Baghdad",
    account: "••7143",
    status: "Bank account added",
    date: "07 Aug 2024",
    logo: process.env.PUBLIC_URL + "/bagdadh.png",
  },
  {
    name: "Tata Motors",
    bank: "National Bank Iraq",
    account: "••0033",
    status: "Bank account added",
    date: "05 Jul 2024",
    logo: process.env.PUBLIC_URL + "/nationalbank.png",
  },
  {
    name: "TATA",
    bank: "Byblos Bank",
    account: "••5845",
    status: "Bank account added",
    date: "20 Jun 2024",
    logo: process.env.PUBLIC_URL + "/byblos.png",
  },
];

const TransferMoney = ({ onClose }) => {
  const navigate = useNavigate();
  const [showUPIID, setShowUPIID] = useState(false); // State to manage toggle

  const handleBackClick = () => {
    navigate("/home");
    onClose();
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <div className="transfer-money-container">
      <div className="bank-header">
        <div className="header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icon"
            data-clickable="true" onClick={handleBackClick}
          />
          <div className="header-icons">
            <FontAwesomeIcon
              icon={faRedo}
              className="icon"
            />
            <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
          </div>
        </div>

        <div className="bank-details text-left px-4">
          <h2 className="mb-0">Transfer Money</h2>
          <div className="bank-form">
            <input type="text" placeholder="Account Number" />
            <input type="text" placeholder="IFSC Code" />
            <input type="text" placeholder="Account Holder Name" />
          </div>
          <button className="add-bank-btn">ADD BANK ACCOUNT</button>
        </div>

        <div className="search-bar mb-0">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Bank Account, UPI ID" />
        </div>
      </div>
      <div className="bank-accounts-sec">
        <div className="tabs">
          <p
            className={!showUPIID ? "active-tab" : ""}
            data-clickable="true" onClick={() => setShowUPIID(false)}
          >
            BANK ACCOUNTS
          </p>
          <p
            className={showUPIID ? "active-tab" : ""}
            data-clickable="true" onClick={() => setShowUPIID(true)}
          >
            UPI ID
          </p>
        </div>

        {showUPIID ? (
          <TOUPIID /> // Render TOUPIID component when showUPIID is true
        ) : (
          <div className="accounts">
            {bankAccounts.map((account, index) => (
              <div key={index} className="account-item">
                <div className="account-logo">
                  <img src={account.logo} alt={account.bank} />
                </div>
                <div className="account-details">
                  <div className="account-status">
                    <p className="name">{account.name}</p>
                    <p className="bank-info">
                      {account.bank} - {account.account}
                    </p>
                  </div>
                  <div>
                    {account.amount ? (
                      <p className="amount">
                        <span style={{ color: "#a88df1" }}>Sent: </span>
                        {account.amount}
                      </p>
                    ) : (
                      <p className="status" style={{ textAlign: "right" }}>
                        {account.status}
                      </p>
                    )}
                    <p className="date">{account.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferMoney;
