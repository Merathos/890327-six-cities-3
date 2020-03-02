import {ActionType} from "../actions/action-creator.js";
import offers from "../__mocks__/offers.js";

const initialState = {
  cities: offers.map((offer) => ({name: offer.city, coords: offer.cityCoordinates})),
  currentCity: {
    name: `Paris`,
    coords: [51.38333, 4.9]
  },
  allOffers: offers,
  offers: offers.filter((offer) => offer.city === `Paris`)[0].offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {...state,
        currentCity: action.payload,
        offers: state.allOffers.filter((offer) => offer.city === action.payload.name)[0].offers};
    default:
      return state;
  }
};

export {reducer};
