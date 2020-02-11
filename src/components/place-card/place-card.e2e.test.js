import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`On place name press`, () => {
  const handleRentHeaderClick = jest.fn();
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        rentOffer={rentOffer}
        handleRentHeaderClick={handleRentHeaderClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
  );

  const placeNameHeader = placeCard.find(`h2`);
  const placeCardArticle = placeCard.find(`article`);

  placeNameHeader.props().onClick();
  placeCardArticle.simulate(`mouseEnter`);
  placeCardArticle.simulate(`mouseLeave`);

  expect(onMouseEnter.mock.calls.length).toBe(1);
  expect(onMouseLeave.mock.calls.length).toBe(1);
  expect(handleRentHeaderClick.mock.calls.length).toBe(1);
});
