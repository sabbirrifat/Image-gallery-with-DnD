import React, { Component } from "react";
import "./image-change.styles.css";
import { connect } from "react-redux";
import { imageReplaceFrom,selectCard } from "../../redux/canvas/canvas-action";

class ImageChange extends Component {
  handleChangePhoto = (card) => {
    this.props.selectCard();
    this.props.imageReplaceFrom(card);
  };

  render() {
    const { card } = this.props;
    return (
      <div className="model-image-change">
        <div className="preview-image">
          <img src={card.img} alt="preview-poster" />
        </div>

        <button
          className="change-photo"
          onClick={() => this.handleChangePhoto(card)}
        >
          Change Photo
        </button>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectCard: () => dispatch(selectCard()),
  imageReplaceFrom: (card) => dispatch(imageReplaceFrom(card)),
});

export default connect(null, mapDispatchToProps)(ImageChange);
