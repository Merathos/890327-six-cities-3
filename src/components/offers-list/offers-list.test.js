import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list.jsx";
import offers from "../../__mocks__/offers";
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

it(`Render Offers list`, () => {
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
          <OffersList
            offers={offers}
            handleRentHeaderClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
