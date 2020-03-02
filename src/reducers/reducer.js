import {ActionType} from "../actions/action-creator.js";
import offers from "../__mocks__/offers.js";

const initialState = {
  cities: offers.map((offer) => ({name: offer.city, coords: offer.cityCoordinates})),
  currentCity: {
    name: `Paris`,
    coords: [51.38333, 4.9]
  },
  offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {...state, currentCity: action.payload};
    default:
      return state;
  }
};

export {reducer};
