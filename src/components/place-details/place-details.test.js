import React from "react";
import renderer from "react-test-renderer";
import PlaceDetails from "./place-details.jsx";
import offers from "../../__mocks__/offers.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import comments from "../../__mocks__/reviews";
import {BrowserRouter as Router} from 'react-router-dom';

const mockStore = configureStore([]);

const cities = [
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
];

const hoveredCard = {
  coords: [123123, 123123]
};

it(`Render place-details`, () => {
  const store = mockStore({
    DATA: {
      offers,
      cities,
      currentCity: {
        name: `Amsterdam`,
        coords: [52.370216, 4.895168],
        zoom: 10
      },
      detailsOfferID: `41324`,
      nearbyOffers: offers,
      comments,
      bookmarkStatus: ``

    },
    APPLICATION: {
      currentSortType: `Popular`,
      hoveredCard
    },
    USER: {
      isAuthorized: false,
      user: {}
    }
  });

  store.dispatch = jest.fn();
  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <PlaceDetails match={{params: {id: `41324`}, isExact: true, path: ``, url: ``}} />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
