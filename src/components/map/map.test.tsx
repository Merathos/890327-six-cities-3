import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from "../../__mocks__/offers";
import {Offer, City} from "../../interfaces";

const mockStore = configureStore([]);

const offersCoords: Array<[number, number]> = [
  [12, 12],
  [12, 12],
  [12, 12],
  [12, 12],
  [12, 12]
];

const cities: City[] = [
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

const hoveredCard: Offer = offers[0];

it(`Should render Map correctly`, () => {
  const store = mockStore({
    DATA: {
      offers,
      cities,
      currentCity: {
        name: `Amsterdam`,
        coords: [52.370216, 4.895168],
        zoom: 10
      }
    },
    APPLICATION: {
      currentSortType: `Popular`,
      hoveredCard
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Map offersCoords={offersCoords} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
