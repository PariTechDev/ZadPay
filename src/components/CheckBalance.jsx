import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faQuestionCircle, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./CheckBalance.css"; // Import CSS for styling

const CheckBalance = ({ onClose }) => {
  // Dummy bank data
  const bankAccounts = [
    { name: "IDB Bank Iraq", number: "1522", logo: process.env.PUBLIC_URL + "/idb.png" },
    { name: "Byblos Bank", number: "XX77", logo: process.env.PUBLIC_URL + "/byblos.png" },
    { name: "Mashreq Bank", number: "4873", logo: process.env.PUBLIC_URL + "/mashreq.png" },
    { name: "National Bank Iraq", number: "7460", logo: process.env.PUBLIC_URL + "/nationalbank.png" }, 
    { name: "Bank of Baghdad", number: "XX62", logo: process.env.PUBLIC_URL + "/bagdadh.png" },
  ];

  const prepaidBalances = [
    { name: "Zadpay Wallet", logo: process.env.PUBLIC_URL + "/zad.png" }
  ];

  const handleRefreshClick = () => {
    // Define what happens when the refresh button is clicked
    console.log("Refresh button clicked");
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div className="check-balance-container">
      <header className="header_top">
        <button className="back-button" data-clickable="true" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2 className="header-title">Check Balance</h2>
        <div className="header-icons">
          <FontAwesomeIcon icon={faRedo} className="icon" onClick={handleRefreshClick} />
          <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
        </div>
      </header>

      {/* Accounts on UPI */}
      <div className="section">
        <h6>Accounts on Zadpay</h6>
        {bankAccounts.map((bank, index) => (
          <div className="bank-item" key={index}>
            <img src={bank.logo} alt={bank.name} className="bank-logo" />
            <span>{bank.name} - {bank.number}</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        ))}
      </div>

      {/* Pre-Paid Balance */}
      <div className="section">
        <h6>Pre-Paid Balance</h6>
        {prepaidBalances.map((balance, index) => (
          <div className="bank-item" key={index}>
            <img src={balance.logo} alt={balance.name} className="bank-logo" />
            <span>{balance.name}</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBalance;
