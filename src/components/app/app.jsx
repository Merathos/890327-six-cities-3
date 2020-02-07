import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = ({quantity, placeNames}) => {
  return <Main quantity={quantity} placeNames={placeNames} />;
};

App.propTypes = {
  quantity: PropTypes.number.isRequired,
  placeNames: PropTypes.array.isRequired,
};

export default App;
