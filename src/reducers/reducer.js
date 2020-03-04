import {ActionType} from "../actions/action-creator.js";
import offers from "../__mocks__/offers.js";
import uniqBy from 'lodash/uniqBy';
import {sortOffers} from '../utils/utils.js';

const initialState = {
  cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
  currentCity: {
    name: `Amsterdam`,
    coords: [52.370216, 4.895168],
    zoom: 10
  },
  allOffers: offers,
  offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
  currentSortType: `Popular`,
  hoveredCard: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {...state,
        currentCity: action.payload,
        offersByCity: state.allOffers.filter((offer) => offer.city.name === action.payload.name)};
    case ActionType.CHANGE_SORT_TYPE:
      return {...state,
        currentSortType: action.payload,
        offersByCity: sortOffers(action.payload, state.offersByCity, state.allOffers.filter((offer) => offer.city.name === state.currentCity.name))
      };
    case ActionType.SET_HOVERED_CARD:
      return {...state,
        hoveredCard: action.payload
      };
    case ActionType.REMOVE_HOVERED_CARD:
      return {...state,
        hoveredCard: {}
      };
    default:
      return state;
  }
};

export {reducer};
