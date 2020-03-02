import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers.js";

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    cities: offers.map((offer) => ({name: offer.city, coords: offer.cityCoordinates})),
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
          <Main handleRentHeaderClick={() => {}} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
