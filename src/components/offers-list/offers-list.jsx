import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

const OffersList = ({offers, handleRentHeaderClick, isNearby}) => {
  return (
    <div className={isNearby ? `near-places__list places__list` : `cities__places-list places__list tabs__content`}>
      {offers.map((rentOffer) => <PlaceCard
        key={rentOffer.id}
        rentOffer={rentOffer}
        handleRentHeaderClick={handleRentHeaderClick}
        isNearby={isNearby}
      />)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
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
        hostStatus: PropTypes.bool,
        description: PropTypes.string.isRequired
      })
  ).isRequired,
  isNearby: PropTypes.bool,
  handleRentHeaderClick: PropTypes.func.isRequired
};

export default OffersList;
