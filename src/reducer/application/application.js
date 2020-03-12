const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  SET_HOVERED_CARD: `SET_HOVERED_CARD`,
  REMOVE_HOVERED_CARD: `REMOVE_HOVERED_CARD`,
};

const initialState = {
  currentSortType: `Popular`,
  hoveredCard: {}
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
    payload: {}
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {...state,
        currentCity: action.payload
      };
    case ActionType.CHANGE_SORT_TYPE:
      return {...state,
        currentSortType: action.payload
      };
    case ActionType.SET_HOVERED_CARD:
      return {...state,
        hoveredCard: action.payload
      };
    case ActionType.REMOVE_HOVERED_CARD:
      return {...state,
        hoveredCard: action.payload
      };
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
