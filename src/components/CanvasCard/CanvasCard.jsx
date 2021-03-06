import React, { useRef, useState } from "react";
import "./canvas-card.styles.css";
import { useDrag, useDrop } from "react-dnd";
import { ItemType } from "../../utils/items";
import ImageChange from "../ImageChange/ImageChange";
import ImageFilter from "../ImageFilter/ImageFilter";

const CanvasCard = ({
  card,
  index,
  moveCard,
  handleDelete,
  popModelStatus,
  changePopModelStatus,
}) => {
  const ref = useRef(null);
  const [optionSwitcher, setOptionSwitcher] = useState("image-change");
  const [isShown, setIsShown] = useState(false);

  const popModelStatusCheck =
    card.char_id === popModelStatus?.char_id ? true : false;

  const [, drop] = useDrop({
    accept: ItemType.CANVAS_CARD,

    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType.CANVAS_CARD, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const createFilterStyle = () => ({
    filter: `blur(${card?.blur}px) brightness(${card?.brightness}%) contrast(${card?.contrast}%) saturate(${card?.saturation}%)`,
  });

  return (
    <div
      className={`canvas-image-container ${
        popModelStatusCheck ? "active" : ""
      }`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => (popModelStatusCheck ? null : setIsShown(false))}
      data-testid="canvas-card"
    >
      <div className="canvas-image-card" ref={ref}>
        {isShown && !isDragging ? (
          <div className="image-options" data-testid="image-options">
            <div
              className={`image-settings ${
                popModelStatusCheck ? "active" : ""
              }`}
              onClick={() => {
                popModelStatusCheck
                  ? changePopModelStatus(null)
                  : changePopModelStatus(card);
              }}
            >
              <i className="fas fa-cog"></i>
            </div>

            <div className="image-delete" onClick={() => handleDelete(card)}>
              <i className="fas fa-trash"></i>
            </div>
          </div>
        ) : null}

        {isDragging ? (
          <div className="blank-image-placeholder"></div>
        ) : (
          <img
            src={card.img}
            style={
              card?.filters && !isDragging
                ? createFilterStyle()
                : { filter: "none" }
            }
            alt="poster"
          />
        )}
      </div>

      {popModelStatusCheck ? (
        <div className="pop-model" data-testid="pop-model">
          <div className="model-options">
            <p
              onClick={() => setOptionSwitcher("image-change")}
              className={optionSwitcher === "image-change" ? "active" : ""}
            >
              Image
            </p>
            <p
              onClick={() => setOptionSwitcher("image-filter")}
              className={optionSwitcher === "image-filter" ? "active" : ""}
            >
              Filter
            </p>
          </div>
          <div className="model-line-break"></div>

          {optionSwitcher === "image-change" ? (
            <ImageChange card={card} />
          ) : optionSwitcher === "image-filter" ? (
            <ImageFilter card={card} />
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
};
export default CanvasCard;
