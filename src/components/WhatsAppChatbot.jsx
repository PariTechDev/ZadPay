import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./WhatsAppChatbot.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WhatsAppChatbot = () => {
    const phoneNumber = "+919392326272"; // Replace with your WhatsApp Business Number
    const message = "Hello, I need assistance!";

    const openWhatsApp = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="whatsapp-chatbot">
            <button className="whatsapp-button" onClick={openWhatsApp}>
                <FontAwesomeIcon icon={faWhatsapp} />
            </button>
        </div>
    );
};

export default WhatsAppChatbot;
