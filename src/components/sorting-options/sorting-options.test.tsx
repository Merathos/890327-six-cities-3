import * as React from "react";
import * as renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import SortingOptions from "./sorting-options";

const mockStore = configureStore([]);

it(`Render Sorting Options`, () => {
  const store = mockStore({
    APPLICATION: {
      currentSortType: `Popular`
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <SortingOptions />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
