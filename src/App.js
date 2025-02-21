import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Auth from "./pages/Auth";
import OtpVerification from "./components/OtpVerification";
import Home from "./pages/Home";
import SimSelection from "./components/SimSelection";
import "./index.css";
import WhatsAppChatbot from "./components/WhatsAppChatbot";
import GlobalClickHighlighter from "./components/GlobalClickHighlighter";

const App = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(false);
    }, [location]);

    const handleLoaderFinish = () => {
        setLoading(false);
    };

    return (
        <>
            {loading && <Loader onFinish={handleLoaderFinish} />}
            {!loading && (
                <div className="main_Parent">
                   <GlobalClickHighlighter>
                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="/otp" element={<OtpVerification />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/sim-selection" element={<SimSelection />} />
                    </Routes>
                    </GlobalClickHighlighter>
                   
                  <div className="whatsapp_bot">
                  <WhatsAppChatbot />
                  </div>
                </div>
            )}
        </>
    );
};

export default App;
