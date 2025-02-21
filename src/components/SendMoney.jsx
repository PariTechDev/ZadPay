import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRedo,
  faQuestionCircle,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./SendMoney.css";

const transactions = [
  {
    name: "Ali Hassan ",
    amount: "$1,500",
    status: "Sent Securely",
    date: "15/02",
    color: "#00BFFF",
    icon: "AH",
  },
  {
    name: "******9991",
    amount: "$50,000",
    status: "Sent Securely",
    date: "14/02",
    color: "#1E90FF",
    icon: "*",
  },
  {
    name: "Zainab Kareem ",
    amount: "$1,500",
    status: "Received Instantly",
    date: "13/02",
    color: "#800080",
    icon: "ZK",
    received: true,
  },
  {
    name: "Omar Mohammed",
    amount: "$11,000",
    status: "Sent Securely",
    date: "13/02",
    color: "#008000",
    icon: "OM",
  },
  {
    name: "******7577",
    amount: "$900",
    status: "Sent Securely",
    date: "12/02",
    color: "#FF0000",
    icon: "*",
  },
  {
    name: "******0077",
    amount: "$1,050",
    status: "Sent Securely",
    date: "12/02",
    color: "#DC143C",
    icon: "*",
  },
  {
    name: "******6796",
    amount: "$30",
    status: "Sent Securely",
    date: "12/02",
    color: "#1E90FF",
    icon: "*",
  },
];

const SendMoney = ({ onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleBackClick = () => {
    navigate("/home");
    onClose();
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.includes(searchTerm) ||
      tx.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.date.includes(searchTerm)
  );

  return (
    <div className="send-money-container">
      <div className="send-money-top">
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

        <div className="upi-apps text-left">
          <h2 className="mb-0">Send Money</h2>
       
          <div className="upi-icons">
          <p style={{color:"#a88df1"}}>to any UPI app</p>
            <img src="./nasswallet.png" style={{marginLeft:"0px"}} alt="NassWallet" />
            <img src="./asiahawala.png" alt="AsiaHawala" />
            <img src="./zaincash.png" alt="GPZain Cashay" />
            <img src="./fastpay.png" alt="FastPay" />
          </div>
        </div>

        <div className="search-bar" data-clickable="true" > 
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input 
            type="text"
            placeholder="Start a new payment from here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="split-expense">
                <div className="left">
                    <div className="icon">🔗</div>
                    <div>
                        <p>Split expense <span className="new-badge">NEW</span></p>
                        <span>Track & settle with friends</span>
                    </div>
                </div>
                <p className="try-now">Try Now</p>
            </div> */}

      <div className="send-money-bottom">
        <div className="transactions">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx, index) => (
              <div key={index} className="transaction-item">
                <div
                  className="transaction-icon"
                  style={{ backgroundColor: tx.color }}
                >
                  {tx.icon}
                </div>
                <div className="transaction-details">
                  <p className="name">{tx.name}</p>
                  <p className="status">{tx.status}</p>
                </div>
                <div className="transaction-amount">
                <p className="amount">{tx.amount}</p>
                <p className="date" style={{color:"#a88df1"}}>{tx.date}</p>
                {tx.received && <span className="received-indicator"></span>}
                    </div>
               
              </div>
            ))
          ) : (
            <p className="no-transactions">
              No transactions match your search.
            </p>
          )}
        </div>

       <div className="m-4">
       <button className="new-payment-btn">
          <FontAwesomeIcon icon={faPlus} /> New Payment
        </button>
       </div>
      </div>
    </div>
  );
};

export default SendMoney;
