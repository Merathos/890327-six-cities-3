import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

it(`Render place-card`, () => {
  const tree = renderer
    .create(<PlaceCard
      placeName={`Cillum Lorem cillum consectetur`}
      placeNameClickHandler={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
