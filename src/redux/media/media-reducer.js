const INITIAL_STATE = {
  mediaCardList: null,
  isFetching: false,
  isImageChangeButtons: false,
};

const mediaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        isFetching: true,
      };

    case "FETCH_STOP":
      return {
        ...state,
        isFetching: false,
      };

    case "UPDATE_MEDIA_CARDS":
      return {
        ...state,
        mediaCardList: action.payload,
        isFetching: false,
      };

    case "IMAGE_CHANGE_BUTTONS":
      return {
        ...state,
        isImageChangeButtons: action.payload,
      };

    default:
      return state;
  }
};

export default mediaReducer;
