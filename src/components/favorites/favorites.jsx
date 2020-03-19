import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from "../header/header.jsx";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import {getBookmarkedOffers, getBookmarkedOffersCities} from "../../reducer/data/selectors.js";

const Favorites = ({bookmarkedOffers, cities}) => {
  return (
    <div className={`page${bookmarkedOffers.length > 0 ? `` : ` page--favorites-empty`}`}>
      <Header/>
      <main className={`page__main page__main--favorites${bookmarkedOffers.length > 0 ? `` : ` page__main--favorites-empty`}`}>
        <div className="page__favorites-container container">
          <section className={`favorites${bookmarkedOffers.length > 0 ? `` : ` favorites--empty`}`}>
            {bookmarkedOffers.length > 0 ? <h1 className="favorites__title">Saved listing</h1> : <h1 className="visually-hidden">Favorites (empty)</h1>}
            <FavoritesList bookmarkedOffers={bookmarkedOffers} cities={cities} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  bookmarkedOffers: PropTypes.array,
  cities: PropTypes.array
};

const mapStateToProps = (state) => ({
  bookmarkedOffers: getBookmarkedOffers(state),
  cities: getBookmarkedOffersCities(state)
});

export default connect(mapStateToProps)(Favorites);
