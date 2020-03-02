import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesList} from "./cities-list";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const cities = [
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
  {
    name: `Paris`,
    coords: [4134, 123123]
  },
];

it(`Should render Cities List`, () => {
  const store = mockStore({
    currentCity: {name: `Paris`, coords: [4134, 123123]},
    cities,
    onCityClick: () => {}
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CitiesList />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
