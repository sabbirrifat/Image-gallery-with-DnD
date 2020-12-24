import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateAlert } from "../../redux/canvas/canvas-action";
import "./pop-alert.styles.css";

const PopAlert = ({ alertMessage, updateAlert }) => {
  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        updateAlert(null);
      }, 1500);
    }
  }, [alertMessage, updateAlert]);

  return (
    <div className="pop-alert">
      <div className="alert-icon">
        <i className="fas fa-exclamation"></i>
      </div>
      <p>{alertMessage}</p>
    </div>
  );
};

const mapStateToProps = ({ canvas }) => ({
  alertMessage: canvas.alertMessage,
});

const mapDispatchToProps = (dispatch) => ({
  updateAlert: (message) => dispatch(updateAlert(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopAlert);
