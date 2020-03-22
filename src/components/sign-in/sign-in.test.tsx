import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in";
import {BrowserRouter as Router} from 'react-router-dom';

const mockStore = configureStore([]);

it(`Render Sign-in`, () => {
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
            <SignIn onSubmit={jest.fn()}/>
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
