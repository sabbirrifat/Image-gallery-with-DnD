export const addCard = (card) => ({
  type: "ADD_CARD",
  payload: card,
});

export const updateCardList = (cards) => ({
  type: "UPDATE_CARDS",
  payload: cards,
});

export const selectCard = () => ({
  type: 'SELECT_CARD'
})

export const imageReplaceFrom = (card) => ({
  type: 'IMAGE_REPLACE_FROM',
  payload: card
})

export const replaceImage = (card) => ({
  type: 'REPLACE_IMAGE',
  payload: card
})

export const updateFilters = (filters) => ({
  type: "UPDATE_FILTERS",
  payload: filters,
});

export const deleteCard = (card) => ({
  type: "DELETE_CARD",
  payload: card,
});

export const updateAlert = (message) => ({
  type: "UPDATE_ALERT",
  payload: message,
});

export const clearStates = () => ({
  type: "CLAER_STATES",
});

export const changePopModelStatus = (status) => ({
  type: "UPDATE_POPMODEL_STATUS",
  payload: status
})
