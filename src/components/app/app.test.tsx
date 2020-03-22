import * as React from "react";
import * as renderer from "react-test-renderer";
import App from "./app";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers";
import {BrowserRouter as Router} from "react-router-dom";

const mockStore = configureStore([]);

const hoveredCard = {
  coords: [123123, 123123]
};

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

it(`Render App`, () => {
  const div = document.createElement(`div`);
  document.body.appendChild(div);

  const store = mockStore({
    DATA: {
      offers,
      cities,
      currentCity: {
        name: `Amsterdam`,
        coords: [52.370216, 4.895168],
        zoom: 10
      },
      detailsOfferID: `2`,
      nearbyOffers: offers
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

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
