import React from "react";
import "./SelfAccount.css";
import { FaArrowLeft, FaQuestionCircle } from "react-icons/fa";

const bankAccounts = [
  {
    id: 1,
    accountNumber: "XXXXXX7460",
    bankName: "IDB Bank Iraq",
    branch: "PAKALA (CHITTOOR DIST.)",
    logo: "/idb.png",
  },
  {
    id: 2,
    accountNumber: "XXXXXXXXXX62",
    bankName: "Byblos Bank",
    branch: "BANGALORE - HOSUR ROAD",
    logo: "/byblos.png",
  },
  {
    id: 3,
    accountNumber: "XXXXXX4873",
    bankName: "Mashreq Bank",
    branch: "JAYANAGAR-RVS PARADISE",
    logo: "/mashreq.png",
  },
  {
    id: 4,
    accountNumber: "XXXX231522",
    bankName: "National Bank Iraq",
    branch: "RBI LAYOUT",
    logo: "/nationalbank.png",
  },
  {
    id: 4,
    accountNumber: "XXXX231522",
    bankName: "Bank of Baghdad",
    branch: "RBI LAYOUT",
    logo: "/bagdadh.png",
  }
];

const SelfAccount = ({ onClose }) => {
  return (
    <div className="send-to-container">
      <div className="header p-4">
        <FaArrowLeft className="back-icon " data-clickable="true" onClick={onClose} />
        <h2 className="m-0">Send To</h2>
        <FaQuestionCircle className="help-icon" />
      </div>

      <div className="account-list p-4">
        {bankAccounts.map((account) => (
          <div key={account.id} className="account-card">
            <img src={account.logo} alt="Bank Logo" className="bank-logo" />
            <div className="account-details">
              <p className="account-number">{account.accountNumber}</p>
              <p className="bank-name">{account.bankName}</p>
              {/* <p className="branch">{account.branch}</p> */}
            </div>
          </div>
        ))}
      </div>

      <button className="add-account-btn">ADD NEW BANK ACCOUNT</button>

      {/* <div className="upi-powered">
        <img src="/zad.png" alt="UPI" className="upi-logo" />
      </div> */}
    </div>
  );
};

export default SelfAccount;
