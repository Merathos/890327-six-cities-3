import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers.js";
import uniqBy from 'lodash/uniqBy';

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
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

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
