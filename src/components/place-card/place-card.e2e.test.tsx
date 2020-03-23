import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";
import offers from "../../__mocks__/offers";
import {BrowserRouter as Router} from "react-router-dom";

configure({adapter: new Adapter()});

it(`Place card should set bookmark & set hovered card`, () => {
  let hoveredCard = {};

  const handleClick = jest.fn();
  const onMouseEnter = () => {
    hoveredCard = tree.props().children.props.rentOffer;
  };
  const onMouseLeave = () => {
    hoveredCard = {};
  };

  const tree = mount(
      <Router>
        <PlaceCard
          rentOffer={offers[0]}
          bookmarkStatus={``}
          isNearby={false}
          onFavoritesList={false}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          handleBookmarkClick={handleClick}
        />
      </Router>
  );

  tree.find(`button`).simulate(`click`);
  expect(handleClick).toHaveBeenCalledTimes(1);

  tree.simulate(`mouseenter`);
  expect(hoveredCard).toStrictEqual(offers[0]);

  tree.simulate(`mouseleave`);
  expect(hoveredCard).toStrictEqual({});
});
