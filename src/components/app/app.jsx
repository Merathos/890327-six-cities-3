import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = ({offers, handleRentHeaderClick}) => {
  return <Main offers={offers} handleRentHeaderClick={handleRentHeaderClick} />;
};

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        picture: PropTypes.string,
        type: PropTypes.string,
        rating: PropTypes.number,
        isBookmarked: PropTypes.bool,
        isPremium: PropTypes.bool,
        price: PropTypes.number,
      })
  ).isRequired,
  handleRentHeaderClick: PropTypes.func.isRequired
};

export default App;
