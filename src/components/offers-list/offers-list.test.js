import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list.jsx";
import offers from "../../__mocks__/offers";

it(`Render Offers list`, () => {
  const tree = renderer
    .create(<OffersList
      offers={offers}
      handleRentHeaderClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
