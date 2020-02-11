import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offers = [
  {
    id: `41234`,
    name: `Ea aute voluptate amet magna id qui`,
    picture: `img/apartment-01.jpg`,
    type: `Apartment`,
    rating: 1,
    isBookmarked: true,
    isPremium: true,
    price: 523
  },
  {
    id: `57686`,
    name: `ex occaecat consectetur enim velit eu.`,
    picture: `img/apartment-02.jpg`,
    type: `Private room`,
    rating: 2,
    isBookmarked: false,
    isPremium: false,
    price: 23
  },
  {
    id: `07980`,
    name: `Cillum Lorem cillum consectetur`,
    picture: `img/apartment-03.jpg`,
    type: `Apartment`,
    rating: 3,
    isBookmarked: false,
    isPremium: true,
    price: 857
  },
  {
    id: `24356`,
    name: `quis do anim aliqua et eiusmod sit aute officia.`,
    picture: `img/apartment-01.jpg`,
    type: `Private room`,
    rating: 4,
    isBookmarked: true,
    isPremium: false,
    price: 188
  }
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      offers={offers}
      handleRentHeaderClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
