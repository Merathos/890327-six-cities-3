import React from "react";
import renderer from "react-test-renderer";
import PlaceDetails from "./place-details.jsx";
import offers from "../../__mocks__/offers.js";

it(`Render place-details`, () => {
  const tree = renderer
    .create(<PlaceDetails
      rentOffer={offers[0]}
      handleRentHeaderClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
