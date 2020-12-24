import { cardsAPI } from "../../utils/imageSource";
import { updateAlert } from "../canvas/canvas-action";

export const fetchCardsStart = () => ({
  type: "FETCH_START",
});

export const fetchCardsStop = () => ({
  type: "FETCH_STOP"
})

export const fetchCardsSuccess = (cards) => ({
  type: "UPDATE_MEDIA_CARDS",
  payload: cards
});

export const fetchCardsSatrtAsync = () => async (dispatch) => {
  dispatch(fetchCardsStart());
  try {
    const response = await fetch(cardsAPI);
    const cards = await response.json()
    dispatch(fetchCardsSuccess(cards));
  }
  catch (err) {
    dispatch(updateAlert(err.message));
    dispatch(fetchCardsStop());
  }

};

export const imageChangeButtonsStatus = (status) => ({
  type: "IMAGE_CHANGE_BUTTONS",
  payload: status
})
