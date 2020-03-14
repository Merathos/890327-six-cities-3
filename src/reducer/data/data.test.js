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
      .reply(200, [{
        "bedrooms": 3,
        "city": {
          "location": {
            "latitude": 52.370216,
            "longitude": 4.895168,
            "zoom": 10
          },
          "name": `Amsterdam`
        },
        "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        "host": {
          "avatar_url": `img/1.png`,
          "id": 3,
          "is_pro": true,
          "name": `Angelina`
        },
        "id": 1,
        "images": [`img/1.png`, `img/2.png`],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 52.35514938496378,
          "longitude": 4.673877537499948,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": `img/1.png`,
        "price": 120,
        "rating": 4.8,
        "title": `Beautiful & luxurious studio at great location`,
        "type": `apartment`
      }]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{
            id: `1`,
            city: {
              name: `Amsterdam`,
              coords: [52.370216, 4.895168],
              zoom: 10
            },
            coords: [52.35514938496378, 4.673877537499948],
            zoom: 8,
            title: `Beautiful & luxurious studio at great location`,
            previewImg: `img/1.png`,
            photos: [`img/1.png`, `img/2.png`],
            bedroomsAmount: 3,
            maxAdults: 4,
            features: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
            type: `apartment`,
            rating: 4.8,
            isBookmarked: false,
            isPremium: false,
            price: 120,
            hostName: `Angelina`,
            hostAvatar: `img/1.png`,
            hostStatus: true,
            description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`
          }],
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
