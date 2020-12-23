import { deleteCard, replaceImage, updateCardFilters } from "./canvas-utils";

const INITIAL_STATE = {
  cardList: [],
  isCardSelected: false,
  imageReplaceFrom: null,
  alertMessage: null,
  popModelStatus: null,
};

const canvasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cardList: [...state.cardList, action.payload],
      };

    case "UPDATE_CARDS":
      return {
        ...state,
        cardList: action.payload,
      };

    case "UPDATE_FILTERS":
      return {
        ...state,
        cardList: updateCardFilters(state.cardList, action.payload),
      };

    case "SELECT_CARD":
      return {
        ...state,
        isCardSelected: !state.isCardSelected,
      };

    case "DELETE_CARD":
      return {
        ...state,
        cardList: deleteCard(state.cardList, action.payload),
      };

    case "IMAGE_REPLACE_FROM":
      return {
        ...state,
        imageReplaceFrom: action.payload,
      };

    case "REPLACE_IMAGE":
      return {
        ...state,
        cardList: replaceImage(
          state.cardList,
          state.imageReplaceFrom,
          action.payload
        ),
      };

    case "UPDATE_ALERT":
      return {
        ...state,
        alertMessage: action.payload,
      };

    case "CLAER_STATES":
      return {
        ...state,
        isCardSelected: state.selectMedia ? false : false,
        imageReplaceFrom: null,
        popModelStatus: null,
      };

    case "UPDATE_POPMODEL_STATUS":
      return {
        ...state,
        popModelStatus: action.payload,
      };

    default:
      return state;
  }
};

export default canvasReducer;
