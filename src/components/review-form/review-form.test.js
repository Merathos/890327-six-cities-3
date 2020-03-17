import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from "./review-form.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`Should render Cities List`, () => {
  const store = mockStore({
    DATA: {
      commentStatus: `SUCCESS`
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <ReviewForm id={`23`} />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
