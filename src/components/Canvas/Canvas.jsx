import React from "react";
import "./canvas.styles.css";
import CanvasCard from "../CanvasCard/CanvasCard";
import { DropTarget } from "react-dnd";
import update from "immutability-helper";
import FolderLogo from "../../assets/folder.svg";
import { ItemType } from "../../utils/items";
import { connect } from "react-redux";
import {
  addCard,
  changePopModelStatus,
  deleteCard,
  updateAlert,
  updateCardList,
} from "../../redux/canvas/canvas-action";

const cardDropTarget = {
  drop(props, monitor) {
    const { cardList, addCard, updateAlert } = props;
    const item = monitor.getItem();

    const existingChecker = props.cardList?.find(
      (card) => card.char_id === item.card.char_id
    );

    if (cardList.length === 9) {
      props.updateAlert("Canvas Image Limit Exceeded");
    } else if (!existingChecker) {
      addCard(item.card);
    } else {
      updateAlert("This image already exist in the canvas");
    }

    return { moved: true };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    itemType: monitor.getItemType(),
  };
}

class Canvas extends React.Component {
  drawFrame = () => {
    const nextState = update(this.props.cardList, this.pendingUpdateFn);
    this.props.updateCardList(nextState);
    this.pendingUpdateFn = undefined;
    this.requestedFrame = undefined;
  };

  componentWillUnmount() {
    if (this.requestedFrame !== undefined) {
      cancelAnimationFrame(this.requestedFrame);
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cardList } = this.props;
    const dragCard = cardList[dragIndex];
    this.scheduleUpdate({
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
  };

  handleDelete = (card) => {
    this.props.deleteCard(card);
  };

  render() {
    const {
      connectDropTarget,
      cardList,
      popModelStatus,
      changePopModelStatus,
    } = this.props;

    return connectDropTarget(
      <div className={`canvas-content ${cardList.length ? "items" : ""}`}>
        {cardList.length ? (
          <div className="canvas-cards">
            {cardList.map((card, key) => (
              <CanvasCard
                key={card?.char_id}
                card={card}
                index={key}
                handleDelete={this.handleDelete}
                moveCard={this.moveCard}
                popModelStatus={popModelStatus}
                changePopModelStatus={changePopModelStatus}
              />
            ))}
          </div>
        ) : (
          <div className="drop-area">
            <div className="drop-image">
              <img src={FolderLogo} alt="" />
            </div>
            <h2>Drop an image from Media Panel</h2>
          </div>
        )}
      </div>
    );
  }
  scheduleUpdate = (updateFn) => {
    this.pendingUpdateFn = updateFn;
    if (!this.requestedFrame) {
      this.requestedFrame = requestAnimationFrame(this.drawFrame);
    }
  };
}

const mapStateToProps = ({ canvas }) => ({
  cardList: canvas.cardList,
  popModelStatus: canvas.popModelStatus,
});

const mapDispatchToProps = (dispatch) => ({
  addCard: (card) => dispatch(addCard(card)),
  updateCardList: (cards) => dispatch(updateCardList(cards)),
  deleteCard: (card) => dispatch(deleteCard(card)),
  updateAlert: (message) => dispatch(updateAlert(message)),
  changePopModelStatus: (status) => dispatch(changePopModelStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(ItemType.MEDIA_CARD, cardDropTarget, collect)(Canvas));
