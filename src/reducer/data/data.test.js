import MockAdapter from "axios-mock-adapter";
import uniqBy from "lodash/uniqBy";
import {createApi} from "../../api/api.js";
import {reducer, ActionType, Operation, ActionCreator} from "./data.js";
import offers from "../../__mocks__/offers.js";
import comments from "../../__mocks__/reviews.js";

const api = createApi(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    offers: [],
    cities: [],
    currentCity: {},
    detailsOfferID: ``,
    nearbyOffers: [],
    comments: [],
    commentStatus: ``,
    bookmarkStatus: ``,
    bookmarkedOffers: []
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

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    currentCity: {}
  }, {
    type: ActionType.CHANGE_CITY,
    payload: {
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    },
  })).toEqual({
    currentCity: {
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    }
  });
});

it(`Reducer should set details offer ID`, () => {
  expect(reducer({
    detailsOfferID: ``
  }, {
    type: ActionType.SET_DETAILS_OFFER_ID,
    payload: `2`,
  })).toEqual({
    detailsOfferID: `2`
  });
});

it(`Reducer should load nearby offers`, () => {
  expect(reducer({
    nearbyOffers: []
  }, {
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: offers,
  })).toEqual({
    nearbyOffers: offers
  });
});

it(`Reducer should load comments`, () => {
  expect(reducer({
    comments: []
  }, {
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  })).toEqual({
    comments,
  });
});

it(`Reducer should set operation status`, () => {
  expect(reducer({
    commentStatus: ``
  }, {
    type: ActionType.SET_OPERATION_STATUS,
    payload: {
      name: `commentStatus`,
      status: `SUCCESS`
    },
  })).toEqual({
    commentStatus: `SUCCESS`
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

  it(`Should make a correct API call to /hotels/2/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyOffersLoader = Operation.loadNearbyOffers(`2`);

    apiMock
      .onGet(`/hotels/2/nearby`)
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

    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEARBY_OFFERS,
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

  it(`Should make a correct API call to /comments/2`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(`2`);

    apiMock
      .onGet(`/comments/2`)
      .reply(200, [{
        "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        "date": `2019-05-08T14:13:56.569Z`,
        "id": 1,
        "rating": 4,
        "user": {
          "avatar_url": `img/1.png`,
          "id": 4,
          "is_pro": false,
          "name": `Max`
        }
      }]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [{
            id: `1`,
            name: `Max`,
            avatar: `img/1.png`,
            rating: 4,
            date: `2019-05-08T14:13:56.569Z`,
            text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`
          }],
        });
      });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading offers returns correct action`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity({
      name: `Paris`,
      coords: [52.38333, 4.9],
      zoom: 10
    })).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `Paris`,
        coords: [52.38333, 4.9],
        zoom: 10
      },
    });
  });

  it(`Action creator for loading nearby offers returns correct action`, () => {
    expect(ActionCreator.loadNearbyOffers(offers)).toEqual({
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator for setDetailsOfferID returns correct action`, () => {
    expect(ActionCreator.setDetailsOfferID(`23`)).toEqual({
      type: ActionType.SET_DETAILS_OFFER_ID,
      payload: `23`,
    });
  });

  it(`Action creator for loading comments returns correct action`, () => {
    expect(ActionCreator.loadComments(comments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    });
  });

  it(`Action creator for setOperationStatus returns correct action`, () => {
    expect(ActionCreator.setOperationStatus(name, status)).toEqual({
      type: ActionType.SET_OPERATION_STATUS,
      payload: {
        name,
        status
      }
    });
  });

  it(`Action creator for updating offers returns correct action`, () => {
    expect(ActionCreator.updateOffers(offers[0])).toEqual({
      type: ActionType.UPDATE_OFFERS,
      payload: offers[0]
    });
  });
});
