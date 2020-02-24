import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import offers from "./__mocks__/offers.js";

ReactDOM.render(
    <App offers={offers} />,
    document.querySelector(`#root`)
);
