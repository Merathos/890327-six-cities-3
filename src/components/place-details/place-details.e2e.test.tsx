import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {PlaceDetails} from "./place-details";
import offers from "../../__mocks__/offers";
import {reviews} from "../../__mocks__/reviews";

configure({adapter: new Adapter()});

it(`Place details should set bookmark`, () => {
  let isFavorite = false;

  const handleClick = () => {
    isFavorite = !isFavorite;
  };

  const tree = shallow(
      <PlaceDetails
        rentOffer={offers[0]}
        match={{params: {id: `41324`}}}
        nearbyOffers={offers}
        comments={reviews}
        bookmarkStatus={``}
        isAuthorized={true}
        setDetailsOfferID={jest.fn}
        loadComments={jest.fn}
        loadNearbyOffers={jest.fn}
        onBookmarkClick={handleClick}
      />
  );

  tree.find(`button`).simulate(`click`);
  expect(isFavorite).toBe(true);
});
