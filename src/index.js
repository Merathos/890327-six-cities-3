import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const RENT_OFFERS_QUANTITY = 420;

ReactDOM.render(
    <App quantity={RENT_OFFERS_QUANTITY} />,
    document.querySelector(`#root`)
);
