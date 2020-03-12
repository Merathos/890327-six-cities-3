import {adapter} from "../../api/adapter.js";
import uniqBy from 'lodash/uniqBy';

const initialState = {
  offers: [],
  cities: [],
  currentCity: {}
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data.map((offer) => adapter(offer))));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {...state,
        offers: action.payload,
        cities: uniqBy(action.payload.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
        currentCity: uniqBy(action.payload.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`)[0],
      };
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
