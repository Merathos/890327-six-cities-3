import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`On place name press`, () => {
  const placeNameClickHandler = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        placeName={`Cillum Lorem cillum consectetur`}
        placeNameClickHandler={placeNameClickHandler}
      />
  );

  const placeNameHeader = placeCard.find(`h2`);

  placeNameHeader.props().onClick();

  expect(placeNameClickHandler.mock.calls.length).toBe(1);
});
