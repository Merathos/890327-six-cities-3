import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const placeNames = [
  `Ea aute voluptate amet magna id qui`,
  `ex occaecat consectetur enim velit eu.`,
  `Cillum Lorem cillum consectetur `,
  `quis do anim aliqua et eiusmod sit aute officia.`,
  `Cillum sint aliquip nulla tempor`
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      quantity={420}
      placeNames={placeNames}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
