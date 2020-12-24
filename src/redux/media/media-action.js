import { cardsAPI } from "../../utils/imageSource";

export const fetchCardsStart = () => ({
  type: "FETCH_START",
});

export const fetchCardsSuccess = (cards) => ({
  type: "UPDATE_MEDIA_CARDS",
  payload: cards
});

export const fetchCardsSatrtAsync = () => async (dispatch) => {
  dispatch(fetchCardsStart());

  const response = await fetch(cardsAPI);
  const cards = await response.json()
  dispatch(fetchCardsSuccess(cards));
};


export const imageChangeButtonsStatus = (status) => ({
  type: "IMAGE_CHANGE_BUTTONS",
  payload: status
})
