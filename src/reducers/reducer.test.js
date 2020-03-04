import {ActionCreator, ActionType} from "../actions/action-creator.js";
import {reducer} from "./reducer.js";
import offers from "../__mocks__/offers.js";
import uniqBy from 'lodash/uniqBy';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
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
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
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
  }, {
    type: ActionType.CHANGE_CITY,
    payload: {
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    },
  })).toEqual({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Paris`),
    currentSortType: `Popular`,
    hoveredCard: {}
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for city change returns correct action`, () => {
    expect(ActionCreator.changeCity({
      name: `Amsterdam`,
      coords: [52.38333, 4.9],
      zoom: 10
    })).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `Amsterdam`,
        coords: [52.38333, 4.9],
        zoom: 10
      },
    });
  });
});
