import React from "react";
import OffersList from "../offers-list/offers-list.jsx";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import SortingOptions from "../sorting-options/sorting-options.jsx";
import withActiveItem from "../../hocs/withActiveItem.jsx";
import {connect} from "react-redux";
import MainEmpty from "../main-empty/main-empty.jsx";

const SortingWrapped = withActiveItem(SortingOptions);

const Main = ({offers, handleRentHeaderClick, currentCity}) => {
  return <main className={`page__main page__main--index${offers.length < 1 ? ` page__main--index-empty` : ``}`}>
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <CitiesList />
    </div>
    <div className="cities">
      {offers.length > 0 ? <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{`${offers.length} place${offers.length > 1 ? `s` : ``} to stay in ${currentCity.name}`}</b>
          <SortingWrapped />
          <OffersList offers={offers} handleRentHeaderClick={handleRentHeaderClick}/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offersCoords={offers.map((offer)=>offer.coords)} />
          </section>
        </div>
      </div> : <MainEmpty />}
    </div>
  </main>;
};

Main.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
          coords: PropTypes.array.isRequired,
          zoom: PropTypes.number.isRequired
        }),
        coords: PropTypes.array.isRequired,
        title: PropTypes.string,
        previewImg: PropTypes.string,
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
  offers: state.offersByCitySorted
});

export {Main};
export default connect(mapStateToProps)(Main);
