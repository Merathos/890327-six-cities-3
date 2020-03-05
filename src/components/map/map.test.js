import React from 'react';
import renderer from 'react-test-renderer';
import Map from "./map";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers.js";

const mockStore = configureStore([]);

const city = {
  name: `Amsterdam`,
  coords: [12, 12],
  zoom: 10
};

const offersCoords = [
  [12, 12],
  [12, 12],
  [12, 12],
  [12, 12],
  [12, 12]
];

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

it(`Should render Map correctly`, () => {
  const store = mockStore({
    cities,
    currentCity: {
      name: `Amsterdam`,
      coords: [52.370216, 4.895168],
      zoom: 10
    },
    allOffers: offers,
    offersByCity: offers.filter((offer) => offer.city.name === `Amsterdam`),
    offersByCitySorted: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentSortType: `Popular`,
    hoveredCard
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Map offersCoords={offersCoords} city={city} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
