// CustomAlert.jsx
import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomAlert = ({ message, onClose, onSkip, onApprove, showClose, showSkip, showApprove , showYes , showNo }) => {
  return (
   <div className="alert_modal">
     <div className="alert alert-dismissible fade show" role="alert">
      {message}
      <div className="alert-buttons mt-3">
        {showApprove && <button className="btn btn-success me-2" onClick={onApprove}>Approve</button>}
        {showSkip && <button className="btn btn-secondary me-2" onClick={onSkip}>Skip</button>}
        {showClose && <button className="btn btn-danger" onClick={onClose}>Close</button>}
        {showYes && <button className="btn btn-danger" onClick={onClose}>Yes</button>}
        {showNo && <button className="btn btn-success" onClick={onClose}>No</button>}
      </div>
    </div>
   </div>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  onApprove: PropTypes.func,
  showClose: PropTypes.bool,
  showSkip: PropTypes.bool,
  showApprove: PropTypes.bool,
  showYes: PropTypes.bool,
  showNo: PropTypes.bool,
};

CustomAlert.defaultProps = {
  showClose: true,
  showSkip: false,
  showApprove: false,
  showYes: false,
  showNo: false,
};

export default CustomAlert;