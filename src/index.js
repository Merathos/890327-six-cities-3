import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const RENT_OFFERS_QUANTITY = 420;

const PLACE_NAMES = [
  `Beautiful &amp; luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood place`
];

ReactDOM.render(
    <App quantity={RENT_OFFERS_QUANTITY} placeNames={PLACE_NAMES} />,
    document.querySelector(`#root`)
);
