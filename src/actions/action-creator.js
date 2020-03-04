const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  SET_HOVERED_CARD: `SET_HOVERED_CARD`,
  REMOVE_HOVERED_CARD: `REMOVE_HOVERED_CARD`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType
  }),
  setHoveredCard: (card) => ({
    type: ActionType.SET_HOVERED_CARD,
    payload: card
  }),
  removeHoveredCard: () => ({
    type: ActionType.REMOVE_HOVERED_CARD,
    payload: null
  })
};

export {ActionCreator, ActionType};
