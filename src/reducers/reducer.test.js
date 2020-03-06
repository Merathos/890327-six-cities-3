import {ActionCreator, ActionType} from "../actions/action-creator.js";
import {reducer} from "./reducer.js";
import offers from "../__mocks__/offers.js";
import uniqBy from "lodash/uniqBy";
import {sortOffers} from "../utils/utils.js";

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
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
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
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
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
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Paris`),
    currentSortType: `Popular`,
    hoveredCard: {}
  });
});

it(`Reducer should change sort type by a given value`, () => {
  expect(reducer({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentSortType: `Popular`,
    hoveredCard: {}
  }, {
    type: ActionType.CHANGE_SORT_TYPE,
    payload: `Price: low to high`,
  })).toEqual({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: sortOffers(`Price: low to high`, offers.filter((offer) => offer.city.name === `Amsterdam`)),
    currentSortType: `Price: low to high`,
    hoveredCard: {}
  });
});

it(`Reducer should change hovered card by a given value`, () => {
  expect(reducer({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentSortType: `Price: low to high`,
    hoveredCard: {}
  }, {
    type: ActionType.SET_HOVERED_CARD,
    payload: {
      coords: [123, 123]
    },
  })).toEqual({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentSortType: `Price: low to high`,
    hoveredCard: {coords: [123, 123]}
  });
});

it(`Reducer should remove hovered card`, () => {
  expect(reducer({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentSortType: `Price: low to high`,
    hoveredCard: {}
  }, {
    type: ActionType.REMOVE_HOVERED_CARD,
    payload: {},
  })).toEqual({
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentSortType: `Price: low to high`,
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
  it(`Action creator for sort change returns correct action`, () => {
    expect(ActionCreator.changeSortType(`Price: low to high`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Price: low to high`,
    });
  });
  it(`Action creator for setting hovered card returns correct action`, () => {
    expect(ActionCreator.setHoveredCard({coords: [123123, 123123]})).toEqual({
      type: ActionType.SET_HOVERED_CARD,
      payload: {coords: [123123, 123123]},
    });
  });
  it(`Action creator for removing hovered card returns correct action`, () => {
    expect(ActionCreator.removeHoveredCard()).toEqual({
      type: ActionType.REMOVE_HOVERED_CARD,
      payload: {},
    });
  });
});
