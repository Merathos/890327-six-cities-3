import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offers = [
  {
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
  },
  {
    id: `57686`,
    name: `ex occaecat consectetur enim velit eu.`,
    picture: `img/apartment-02.jpg`,
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
    type: `Private room`,
    rating: 2,
    isBookmarked: false,
    isPremium: false,
    price: 23,
    hostName: `Angelina`,
    hostAvatar: `img/avatar-angelina.jpg`,
    hostStatus: `pro`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                  The building is green and from 18th century.
                  An independent House, strategically located between Rembrand Square and National Opera,
                  but where the bustle of the city comes to rest in this alley flowery and colorful.`
  },
  {
    id: `07980`,
    name: `Cillum Lorem cillum consectetur`,
    picture: `img/apartment-03.jpg`,
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
    rating: 3,
    isBookmarked: false,
    isPremium: true,
    price: 857,
    hostName: `Angelina`,
    hostAvatar: `img/avatar-angelina.jpg`,
    hostStatus: `pro`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                  The building is green and from 18th century.
                  An independent House, strategically located between Rembrand Square and National Opera,
                  but where the bustle of the city comes to rest in this alley flowery and colorful.`
  },
  {
    id: `24356`,
    name: `quis do anim aliqua et eiusmod sit aute officia.`,
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
    type: `Private room`,
    rating: 4,
    isBookmarked: true,
    isPremium: false,
    price: 188,
    hostName: `Angelina`,
    hostAvatar: `img/avatar-angelina.jpg`,
    hostStatus: `pro`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                  The building is green and from 18th century.
                  An independent House, strategically located between Rembrand Square and National Opera,
                  but where the bustle of the city comes to rest in this alley flowery and colorful.`
  }
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
