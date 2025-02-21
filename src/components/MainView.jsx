import React from "react";
import { useHistory } from "react-router-dom";

const MainView = () => {
  const history = useHistory();

  const handleStartVerification = () => {
    history.push("/otp-verification");
  };

  return (
    <div>
      <h1>Main View</h1>
      <button onClick={handleStartVerification}>Start OTP Verification</button>
    </div>
  );
};

export default MainView;
