import React from "react";
import PropTypes from "prop-types";

const PlaceCard = ({rentOffer, handleRentHeaderClick, onMouseEnter, onMouseLeave}) => {
  const {name, picture, type, rating, isBookmarked, isPremium, price} = rentOffer;

  return (
    <article className="cities__place-card place-card"
      onMouseLeave={() => {
        onMouseLeave();
      }}
      onMouseEnter={() => {
        onMouseEnter(rentOffer);
      }}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ``}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={picture} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ` + (isBookmarked ? `place-card__bookmark-button--active` : ``)} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: (rating * 100 / 5) + `%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          onClick={handleRentHeaderClick}
          className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  rentOffer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    isBookmarked: PropTypes.bool,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,

  handleRentHeaderClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default PlaceCard;
