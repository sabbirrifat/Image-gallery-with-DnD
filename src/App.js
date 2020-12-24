import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Media from "./components/Media/Media";
import Canvas from "./components/Canvas/Canvas";
import PopAlert from "./components/PopAlert/PopAlert";
import { fetchCardsSatrtAsync } from "./redux/media/media-action";
import { updateAlert, clearStates } from "./redux/canvas/canvas-action";

class App extends Component {

  componentDidMount() {
    this.props.fetchCardsSatrtAsync()
  }

  /* checkAlertStatus = (alertMessage) => {
    if (alertMessage) {
      setTimeout(() => {
        this.props.updateAlert(null);
      }, 1500);
    }
  }; */

  render() {
    const {
      mediaCards,
      isFetching,
      popModelStatus,
      alertMessage,
      imageReplaceFrom,
      clearStates,
    } = this.props;


    //this.checkAlertStatus(alertMessage);

    return (
      <div id="App">
        
        <div className="media-panel">
          { isFetching
            ? <div className="loader">
                <div className="loader-inner">
                  <div className="loader-inner"></div>
                </div>
            </div>
            : <Media cards={mediaCards} /> 
         
          }
          
          
        </div>

        <div className="canvas">
          <Canvas />

          {/******** Canvas Pop Over ********/}

          { imageReplaceFrom || popModelStatus 
            ? (
              <div
                className={`canvas-popover ${imageReplaceFrom ? "black" : "white"}`}
                onClick={clearStates}
              ></div>
              ) : null }

        </div>
        { alertMessage ? <PopAlert /> : null }
      </div>
    );
  }
}

const mapStateToProps = ({ media, canvas }) => ({
  mediaCards: media.mediaCardList,
  isFetching: media.isFetching,
  alertMessage: canvas.alertMessage,
  imageReplaceFrom: canvas.imageReplaceFrom,
  popModelStatus: canvas.popModelStatus

  
});

const mapDispatchToProps = (dispatch) => ({
  fetchCardsSatrtAsync: () => dispatch(fetchCardsSatrtAsync()),
  updateAlert: (message) => dispatch(updateAlert(message)),
  clearStates: () => dispatch(clearStates())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
