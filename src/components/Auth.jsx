import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert"; // Import the CustomAlert component

const Auth = () => {
  const [simNumber, setSimNumber] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State to control alert message
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const navigate = useNavigate();

  const handleSimNumberChange = (e) => {
    setSimNumber(e.target.value);
  };

  const handleProceed = () => {
    navigate("/sim-selection", { state: { simNumber } });
  };

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  return (
    <div>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          showClose={true}
          showSkip={false}
          showApprove={false}
        />
      )}
      <input data-clickable="true" 
        type="text"
        id="mobileNumber"
        value={simNumber}
        onChange={handleSimNumberChange}
        placeholder="Enter your SIM number"
      />
      <button data-clickable="true" onClick={handleProceed}>Proceed</button>
      {/* onClick={() => handleShowAlert("Terms & Conditions")} */}
      <button >Terms & Conditions</button>
      {/* onClick={() => handleShowAlert("Privacy Policy")}  */}
      <button >Privacy Policy</button>
    </div>
  );
};

export default Auth;
