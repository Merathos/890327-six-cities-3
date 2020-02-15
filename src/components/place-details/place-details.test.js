import React from "react";
import renderer from "react-test-renderer";
import PlaceDetails from "./place-details.jsx";

const rentOffer = {
  id: `41234`,
  name: `Ea aute voluptate amet magna id qui`,
  picture: `apartment-01`,
  photos: [`room`, `room`, `room`, `room`, `room`, `room`],
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
  hostAvatar: `avatar-angelina`,
  hostStatus: `pro`,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                The building is green and from 18th century.
                An independent House, strategically located between Rembrand Square and National Opera,
                but where the bustle of the city comes to rest in this alley flowery and colorful.`
};

it(`Render place-details`, () => {
  const tree = renderer
    .create(<PlaceDetails
      rentOffer={rentOffer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
