import MockAdapter from "axios-mock-adapter";
import uniqBy from "lodash/uniqBy";
import {createApi} from "../../api/api.js";
import {reducer, ActionType, Operation} from "./data.js";
import offers from "../../__mocks__/offers.js";

const api = createApi(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    offers: [],
    cities: [],
    currentCity: {}
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
    offers: [],
    cities: [],
    currentCity: {}
  }, {
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  })).toEqual({
    offers,
    cities: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
    currentCity: uniqBy(offers.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`)[0]
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    offers: [],
    cities: [],
    currentCity: {}
  }, {
    type: ActionType.CHANGE_CITY,
    payload: {
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    },
  })).toEqual({
    offers: [],
    cities: [],
    currentCity: {
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    }
  });
});
