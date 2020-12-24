import React from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "../../utils/items";
import "./media-card.styles.css";

const MediaCard = ({ card, isCardSelected, updateMediaStatus, replaceImageTarget}) => {

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemType.MEDIA_CARD,
      card: card,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
  return (
    <>
      { isCardSelected ? (
        <div
          className={`image-card ${
            card?.char_id === replaceImageTarget?.char_id ? "selected" : ""}`}
          data-testid="image-card"
        >
          <img
            onClick={() => {
              updateMediaStatus(card);
            }}
            src={card.img}
            alt="poster"
          />

        </div>
      ) : (
        <div className="image-card" ref={drag}>
          
          <img
            className={isDragging ? "media-card-dragging" : ""}
            src={card.img}
            alt="poster"
          />

        </div>
      )}
    </>
  );
};

export default MediaCard;
