import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faQuestionCircle,
  faUser,
  faClockRotateLeft,
  faMoneyBillTransfer,
  faSyncAlt,
  faLandmark,
  faMotorcycle,
  faCar,
  faHeartbeat,
  faBitcoinSign,
  faHandHoldingHeart,
  faCoins,
  faBullhorn,
  faGem,
  faHome,
  faQrcode,
  faRandom,
  faWallet,
  faSackDollar,
  faGraduationCap,
  faHouseMedical,
  faCreditCard,
  faHandsBound,
  faEarthAmericas
} from "@fortawesome/free-solid-svg-icons";
import QRScanner from "../components/QRScanner";
import SendMoney from "../components/SendMoney";
import TransferMoney from "../components/TransferMoney";
import Wallet from "../components/Wallet";
import ReceiveMoney from "../components/ReceiveMoney"; // Import ReceiveMoney component
import CheckBalance from "../components/CheckBalance"; // Import CheckBalance component
import TransactionHistory from "../components/TransactionHistory"; // Import TransactionHistory component
import SelfAccount from "../components/SelfAccount"; // Import SelfAccount component
import PaymentReceipt from "../components/PaymentReceipt"; // Import PaymentReceipt component

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleScannerClick = () => {
    setActiveComponent("QRScanner");
  };

  const handleSendMoneyClick = () => {
    setActiveComponent("SendMoney");
  };

  const handleTransferMoneyClick = () => {
    setActiveComponent("TransferMoney");
  };

  const handleCheckBalanceClick = () => {
    setActiveComponent("CheckBalance");
  };

  const handleReceiveMoneyClick = () => {
    setActiveComponent("ReceiveMoney");
  };

  const handleWalletClick = () => {
    setActiveComponent("Wallet");
  };

  const handleHistoryClick = () => {
    setActiveComponent("TransactionHistory");
  };

  const handleSelfAccountClick = () => {
    setActiveComponent("SelfAccount");
  };

  const handleBackClick = () => {
    setActiveComponent(null);
  };

  if (activeComponent === "QRScanner") {
    return <QRScanner onClose={handleBackClick} />;
  }

  if (activeComponent === "SendMoney") {
    return <SendMoney onClose={handleBackClick} />;
  }

  if (activeComponent === "TransferMoney") {
    return <TransferMoney onClose={handleBackClick} />;
  }

  if (activeComponent === "Wallet") {
    return <Wallet onClose={handleBackClick} />;
  }


if (activeComponent === "PaymentReceipt") {
  return <PaymentReceipt onDone={handleBackClick} />;
}

  if (activeComponent === "ReceiveMoney") {
    return <ReceiveMoney onClose={handleBackClick} />;
  }

  if (activeComponent === "CheckBalance") {
    return <CheckBalance onClose={handleBackClick} />;
  }

  if (activeComponent === "TransactionHistory") {
    return <TransactionHistory onClose={handleBackClick} />;
  }

  if (activeComponent === "SelfAccount") {
    return <SelfAccount onClose={handleBackClick} />;
  }

  return (
    <div className="home-container">
      {/* Header */}
      <nav className="navbar-custom">
        <div className="profile-section">
          <img src="./profile.jpg" alt="Profile" className="profile-img" />
        </div>

        <div>
          <img src="./zad.png" style={{ width: "60px" }} alt="Logo" />
        </div>

        <div className="icons">
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faQuestionCircle} />
        </div>
      </nav>

      {/* Payments Section */}
      <div className="container mt-3">
        <div className="transfer-box">
          <h5 className="p-2 text-left" style={{ textAlign: "left" }}>
            <span className="glitter_text">Transfer Money</span>
          </h5>
          <div className="row mt-3">
            {[
              { icon: faUser, label: "Send To Contact", onClick: handleSendMoneyClick },
              { icon: faLandmark, label: "Send To ZadPay Bank", onClick: handleTransferMoneyClick },
              { icon: faSyncAlt, label: "To Self Account", onClick: handleSelfAccountClick },
              { icon: faMoneyBillTransfer, label: "Check Balance", onClick: handleCheckBalanceClick },
            ].map((item, index) => (
              <div key={index} className="col-3 section-item" onClick={item.onClick}>
                <div className="transfer-icon" data-clickable="true" >
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <p className=" mt-1" style={{ fontSize: "14px" }}>{item.label}</p>
              </div>
            ))}
          </div>
          <h5 className="p-2 text-left" style={{ textAlign: "left" }} >
            <span className="glitter-text">Receive Money</span>
          </h5>
          {/* <div className="row mt-3">
            {[
              { icon: faUser, label: "To Mobile" },
              { icon: faLandmark, label: "To Bank" },
              { icon: faSyncAlt, label: "To Self Account" },
              { icon: faMoneyBillTransfer, label: "Check Balance" },
            ].map((item, index) => (
              <div key={index} className="col-3 section-item">
                <div className="transfer-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <p className="transfer-label">{item.label}</p>
              </div>
            ))}
          </div> */}

          <div className="upi-info" data-clickable="true" onClick={handleReceiveMoneyClick}> 
            <small>
            Zad ID: 1234567890@ybl <FontAwesomeIcon icon={faQrcode} />
            </small>
          </div>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="container mt-4">
        <div className="wallet-box">
          <div className="row">
            {[
              { icon: faWallet, label: "Zad Wallet", onClick: handleWalletClick },
              { icon: faClockRotateLeft, label: "Payments & History", onClick: handleHistoryClick },
              { icon: faCreditCard, label: "Credit Card"},
              { icon:   faEarthAmericas, label: "Foreign Exchange " },
              
            ].map((item, index) => (
              <div key={index} className="col-3 section-item"  onClick={item.onClick}>
                <div className="insurance-icon" >
                  <FontAwesomeIcon icon={item.icon} data-clickable="true" />
                  <p className="m-0 mt-2">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loans */}
      <div className="container mt-4">
        <div className="insurance-box">
          <h5 className="p-2 card_tiles">
            <span>Loans</span>{" "}
            <a href="#" className="view-all">
              View All →
            </a>
          </h5>
          <div className="row mt-3">
            {[
              { icon: faSackDollar, label: "Micro Loans" },
              { icon: faCar, label: "Vehical Loans" },
              { icon: faHouseMedical, label: "Medical Loans" },
              { icon: faGraduationCap, label: "Education Loans" },
            ].map((item, index) => (
              <div key={index} className="col-3 section-item">
                <div className="insurance-icon">
                  <FontAwesomeIcon icon={item.icon} />
                  <p style={{ fontSize: "14px" }} className="mt-2">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Insurance */}
      <div className="container mt-4">
        <div className="insurance-box">
          <h5 className="p-2 card_tiles">
            <span>Insurance</span>{" "}
            <a href="#" className="view-all">
              View All →
            </a>
          </h5>
          <div className="row mt-3">
            {[
              { icon: faMotorcycle, label: "Bike" },
              { icon: faCar, label: "Car" },
              { icon: faHeartbeat, label: "Health" },
              { icon: faHandHoldingHeart, label: "Term Life" },
            ].map((item, index) => (
              <div key={index} className="col-3 section-item">
                <div className="insurance-icon">
                  <FontAwesomeIcon icon={item.icon} />
                  <p style={{ fontSize: "14px" }} className="mt-2">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wealth Section */}
      <div className="container mt-4">
        <div className="stocks-box">
          <h5 className="p-2 card_tiles">
            <span>Invest & Trade </span>{" "}
            <a href="#" className="view-all ">
              View All →
            </a>
          </h5>
          <div className="row mt-3">
            {[
              { icon: faBitcoinSign, label: "Crypto" },
              { icon: faHandsBound, label: "Mutual Funds" },
              { icon: faBullhorn, label: "IPO" },
              { icon: faGem, label: "Gold" },
            ].map((item, index) => (
              <div key={index} className="col-3 section-item">
                <div className="stocks-icon">
                  <FontAwesomeIcon icon={item.icon} />
                  <p className="mt-2" style={{fontSize:"14px"}}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="footer-nav">
        <div className="footer-icon" data-clickable="true" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>

        <div className="scanner-btn" data-clickable="true" onClick={handleScannerClick}>
          <FontAwesomeIcon icon={faQrcode} />
        </div>

        <div className="footer-icon" data-clickable="true" onClick={handleHistoryClick}>
          <FontAwesomeIcon icon={faRandom} />
          <span>History</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
