import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import offers from "../../__mocks__/offers";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {City} from "../../interfaces";
import {BrowserRouter as Router} from "react-router-dom";

configure({adapter: new Adapter()});
const mockStore = configureStore([]);

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

it(`Place card should set bookmark & set hovered card`, () => {
  let hoveredCard = {};

  const handleClick = jest.fn();
  const onMouseEnter = () => {
    hoveredCard = offers[0];
  };
  const onMouseLeave = () => {
    hoveredCard = {};
  };

  const store = mockStore({
    DATA: {
      offers,
      cities,
      currentCity: {
        name: `Amsterdam`,
        coords: [52.370216, 4.895168],
        zoom: 10
      },
      bookmarkStatus: `SUCCESS`
    },
    APPLICATION: {
      currentSortType: `Popular`,
    }
  });

  store.dispatch = jest.fn();

  const tree = mount(
      <Router>
        <Provider store={store}>
          <PlaceCard
            rentOffer={offers[0]}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            bookmarkStatus={``}
            isNearby={false}
            onFavoritesList={false}
          />
        </Provider>
      </Router>
  );

  tree.find(`button`).simulate(`click`);
  expect(handleClick).toHaveBeenCalledTimes(1);

  tree.simulate(`mouseenter`);
  expect(hoveredCard).toBe(offers[0]);

  tree.simulate(`mouseleave`);
  expect(hoveredCard).toBe({});
});
