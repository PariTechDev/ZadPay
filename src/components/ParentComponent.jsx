import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import MainView from "./MainView";
import Home from "./Home";
import QRScanner from "./QRScanner";

const ParentComponent = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <Router>
      <Switch>
        <Route path="/otp-verification">
          <OtpVerification
            isVerified={isVerified}
            setIsVerified={setIsVerified}
            onVerify={handleVerify}
          />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/qr-scanner" component={QRScanner} />
        <Route path="/" component={MainView} />
      </Switch>
    </Router>
  );
};

export default ParentComponent;
