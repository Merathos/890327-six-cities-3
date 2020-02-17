import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlaceCard: null
    };

    this._setActivePlaceCard = this._setActivePlaceCard.bind(this);
    this._removeActivePlaceCard = this._removeActivePlaceCard.bind(this);
  }

  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {this.props.offers.map((rentOffer) => <PlaceCard
          key={rentOffer.id}
          rentOffer={rentOffer}
          handleRentHeaderClick={this.props.handleRentHeaderClick}
          onMouseEnter={this._setActivePlaceCard}
          onMouseLeave={this._removeActivePlaceCard}
        />)}
      </div>
    );
  }

  _setActivePlaceCard(rentOffer) {
    this.setState({
      activePlaceCard: rentOffer
    });
  }

  _removeActivePlaceCard() {
    this.setState({
      activePlaceCard: null
    });
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
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
      })
  ).isRequired,
  handleRentHeaderClick: PropTypes.func.isRequired
};

export default OffersList;
