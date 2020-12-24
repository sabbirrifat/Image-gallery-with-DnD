import React, { Component } from "react";
import { connect } from "react-redux";
import "./pop-alert.styles.css";

class PopAlert extends Component {
  render() {
    const { alertMessage, changeText } = this.props;

    return (
      <div className="pop-alert">
        <div className="alert-icon">
          <i className="fas fa-exclamation"></i>
        </div>
        <p>{alertMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ canvas }) => ({
  alertMessage: canvas.alertMessage,
});

const mapDispatchToProps = dispatch => ({
  changeText: (message) => dispatch({ type: 'UPDATE_ALERT', payload: message}) 
});

export default connect(mapStateToProps, mapDispatchToProps)(PopAlert);
