import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`Render Header`, () => {
  const store = mockStore({
    USER: {
      authorizationStatus: `NO_AUTH`,
      user: {}
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Header />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
