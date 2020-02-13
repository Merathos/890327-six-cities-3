import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const rentOffer = {
  id: `57686`,
  name: `ex occaecat consectetur enim velit eu.`,
  picture: `img/apartment-02.jpg`,
  type: `Private room`,
  rating: 2,
  isBookmarked: false,
  isPremium: false,
  price: 23
};

it(`Render place-card`, () => {
  const tree = renderer
    .create(<PlaceCard
      rentOffer={rentOffer}
      handleRentHeaderClick={() => {}}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
