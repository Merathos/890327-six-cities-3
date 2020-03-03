import {ActionCreator, ActionType} from "../actions/action-creator.js";
import {reducer} from "./reducer.js";
import offers from "../__mocks__/offers.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    cities: offers.map((offer) => ({name: offer.city, coords: offer.cityCoordinates})),
    currentCity: {
      name: `Paris`,
      coords: [51.38333, 4.9]
    },
    allOffers: offers,
    offers: offers.filter((offer) => offer.city === `Paris`)[0].offers
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    cities: offers.map((offer) => ({name: offer.city, coords: offer.cityCoordinates})),
    currentCity: {
      name: `Paris`,
      coords: [51.38333, 4.9]
    },
    allOffers: offers,
    offers: offers.filter((offer) => offer.city === `Paris`)[0].offers
  }, {
    type: ActionType.CHANGE_CITY,
    payload: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    },
  })).toEqual({
    cities: offers.map((offer) => ({name: offer.city, coords: offer.cityCoordinates})),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    },
    allOffers: offers,
    offers: offers.filter((offer) => offer.city === `Amsterdam`)[0].offers
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for city change returns correct action`, () => {
    expect(ActionCreator.changeCity({
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    })).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `Amsterdam`,
        coords: [52.38333, 4.9]
      },
    });
  });
});
