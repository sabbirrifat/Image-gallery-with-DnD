import { cardsAPI } from "../../utils/imageSource";

export const fetchCardsStart = () => ({
  type: "FETCH_START",
});

export const fetchCardsSuccess = (cards) => ({
  type: "UPDATE_MEDIA_CARDS",
  payload: cards
});

export const fetchCardsSatrtAsync = () => {
  return (dispatch) => {
    dispatch(fetchCardsStart);

    fetch(cardsAPI)
      .then(data => data.json())
      .then(cards => dispatch(fetchCardsSuccess(cards)));
  };
};

export const imageChangeButtonsStatus = (status) => ({
    type: "IMAGE_CHANGE_BUTTONS",
    payload: status
})
