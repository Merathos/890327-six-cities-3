import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers.js";

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    currentCityOffers: offers,
    currentCity: {
      name: `Paris`,
      coords: [51.38333, 4.9]
    }
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
