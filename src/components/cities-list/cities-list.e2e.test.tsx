import * as React from "react";
import {configure, shallow} from "enzyme";
import {CitiesList} from "./cities-list";
import {City} from "../../interfaces";
import * as Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});
const cities: City[] = [
  {
    name: `Paris`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Amsterdam`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Cologne`,
    coords: [4134, 123123],
    zoom: 10
  },
  {
    name: `Asdsdsd`,
    coords: [4134, 123123],
    zoom: 10
  }
];

const currentCity: City = {
  name: `Paris`,
  coords: [4134, 123123],
  zoom: 10
};

it(`City tab should be pressed`, () => {
  const handleClick = jest.fn();

  const tree = shallow(
      <CitiesList
        currentCity={currentCity}
        cities={cities}
        onCityClick={handleClick}
      />
  );

  tree.find(`.locations__item`).first().simulate(`click`);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
