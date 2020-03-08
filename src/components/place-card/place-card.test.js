import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";
import offers from "../../__mocks__/offers.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

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

it(`Render place-card`, () => {
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
          <PlaceCard
            rentOffer={offers[0]}
            handleRentHeaderClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
