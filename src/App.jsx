import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Import Home component
import Wallet from "./components/Wallet"; // Import Wallet component
import TopUpWays from "./components/TopUpWays";
import UPIPinEntry from "./components/UPIPinEntry"; // Import UPIPinEntry component
import TransactionLoader from "./components/TransactionLoader";
import GlobalClickHighlighter from "./components/GlobalClickHighlighter";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import ChatbotConfig from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

function App() {
  return (
    <Router>
      <GlobalClickHighlighter>
      <Routes>
        <Route path="/home" element={<Home />} /> {/* Define /home route */}
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/topupways" element={<TopUpWays />} />
        <Route path="/upipinentry" element={<UPIPinEntry />} />
        <Route path="/transaction-loader" element={<TransactionLoader amount={100} />} />
        {/* ...other routes... */}
      </Routes>
      </GlobalClickHighlighter>
    </Router>
  );
}

export default App;
