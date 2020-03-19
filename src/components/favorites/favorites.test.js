import React from 'react';
import renderer from 'react-test-renderer';
import Favorites from "./favorites";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers.js";
import {BrowserRouter as Router} from 'react-router-dom';

const mockStore = configureStore([]);

it(`Should render favorites`, () => {
  const store = mockStore({
    DATA: {
      bookmarkedOffers: offers,
      cities: [`Amsterdam`, `Paris`, `Cologne`]
    },
    USER: {
      isAuthorized: true,
      user: {email: `some@email.com`}
    }
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <Favorites />
          </Provider>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
