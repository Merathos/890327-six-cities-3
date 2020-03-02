import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from "./cities-list";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers.js";

const mockStore = configureStore([]);

const cities = [
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
];

it(`Should render Cities List`, () => {
  const store = mockStore({
    cities,
    currentCity: {
      name: `Paris`,
      coords: [51.38333, 4.9]
    },
    allOffers: offers,
    offers: offers.filter((offer) => offer.city === `Paris`)[0].offers
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CitiesList />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
