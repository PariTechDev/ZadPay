import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

class MyComponent extends Component {
  state = {
    showAlert: false,
  };

  handleTermsAndConditionsClick = () => {
    alert("Close");
}
  handleCloseAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    return (
      <div>
        {/* onClick={this.handleTermsAndConditionsClick} */}
        <Button >
          Terms and Conditions
        </Button>
        {this.state.showAlert && (
          // onClose={this.handleCloseAlert}
          <Alert variant="danger"  dismissible>
            {/* <Alert.Heading>Terms and Conditions</Alert.Heading> */}
            <p>
              Please read and accept the terms and conditions.
            </p>
          </Alert>
        )}
      </div>
    );
  }
}

export default MyComponent;
