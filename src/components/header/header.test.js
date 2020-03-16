import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';

const mockStore = configureStore([]);

it(`Render Header`, () => {
  const store = mockStore({
    USER: {
      isAuthorized: false,
      user: {}
    }
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <Header />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
