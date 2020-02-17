import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const rentOffer = {
  id: `41234`,
  name: `Ea aute voluptate amet magna id qui`,
  picture: `img/apartment-01.jpg`,
  photos: [`img/room.jpg`, `img/room.jpg`, `img/room.jpg`, `img/room.jpg`, `img/room.jpg`, `img/room.jpg`],
  bedroomsAmount: 1,
  maxAdults: 2,
  features: [
    `Wi-Fi`,
    `Washing machine`,
    `Towels`,
    `Heating`,
    `Coffee machine`,
    `Baby seat`,
    `Kitchen`,
    `Dishwasher`,
    `Cabel TV`,
    `Fridge`
  ],
  type: `Apartment`,
  rating: 1,
  isBookmarked: true,
  isPremium: true,
  price: 523,
  hostName: `Angelina`,
  hostAvatar: `img/avatar-angelina.jpg`,
  hostStatus: `pro`,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                The building is green and from 18th century.
                An independent House, strategically located between Rembrand Square and National Opera,
                but where the bustle of the city comes to rest in this alley flowery and colorful.`
};

it(`On place name press and mouseover`, () => {
  const handleRentHeaderClick = jest.fn();
  const onMouseEnter = jest.fn();


  const placeCard = shallow(
      <PlaceCard
        rentOffer={rentOffer}
        handleRentHeaderClick={handleRentHeaderClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => {}}
      />
  );

  const placeNameHeader = placeCard.find(`h2`);

  placeNameHeader.props().onClick();
  placeCard.simulate(`mouseEnter`, onMouseEnter);

  expect(onMouseEnter.mock.calls[0][0]).toBe(rentOffer);
  expect(onMouseEnter.mock.calls.length).toBe(1);
  expect(handleRentHeaderClick.mock.calls.length).toBe(1);
});
