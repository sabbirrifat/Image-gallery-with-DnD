import React, { Component } from "react";
import { connect } from "react-redux";
import "./pop-alert.styles.css";

class PopAlert extends Component {
  render() {
    const { alertMessage } = this.props;

    return (
      <div className="pop-alert">
        <div className="alert-icon">
          <i class="fas fa-exclamation"></i>
        </div>
        <p>{alertMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ canvas }) => ({
  alertMessage: canvas.alertMessage,
});

export default connect(mapStateToProps)(PopAlert);
