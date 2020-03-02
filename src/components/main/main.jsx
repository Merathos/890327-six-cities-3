import React from "react";
import OffersList from "../offers-list/offers-list.jsx";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import {connect} from "react-redux";

const Main = ({currentCityOffers, handleRentHeaderClick, currentCity}) => {
  return <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <CitiesList />
    </div>
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{`${currentCityOffers.length} place${currentCityOffers.length > 1 ? `s` : ``} to stay in ${currentCity.name}`}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex="0">
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"/>
              </svg>
            </span>
            <ul className="places__options places__options--custom">
              <li className="places__option places__option--active" tabIndex="0">Popular</li>
              <li className="places__option" tabIndex="0">Price: low to high</li>
              <li className="places__option" tabIndex="0">Price: high to low</li>
              <li className="places__option" tabIndex="0">Top rated first</li>
            </ul>
          </form>
          <OffersList offers={currentCityOffers} handleRentHeaderClick={handleRentHeaderClick}/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={currentCityOffers} cityCoords={currentCity.coords}/>
          </section>
        </div>
      </div>
    </div>
  </main>;
};

Main.propTypes = {
  currentCityOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        coords: PropTypes.array.isRequired,
        name: PropTypes.string,
        picture: PropTypes.string,
        photos: PropTypes.array.isRequired,
        bedroomsAmount: PropTypes.number.isRequired,
        maxAdults: PropTypes.number.isRequired,
        features: PropTypes.array.isRequired,
        type: PropTypes.string,
        rating: PropTypes.number,
        isBookmarked: PropTypes.bool,
        isPremium: PropTypes.bool,
        price: PropTypes.number,
        hostName: PropTypes.string.isRequired,
        hostAvatar: PropTypes.string.isRequired,
        hostStatus: PropTypes.string,
        description: PropTypes.string.isRequired
      })).isRequired,
  handleRentHeaderClick: PropTypes.func.isRequired,
  currentCity: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  currentCityOffers: state.offers.filter((offer) => offer.city === state.currentCity.name)[0].offers
});

export {Main};
export default connect(mapStateToProps)(Main);
