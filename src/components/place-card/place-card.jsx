import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/application/application.js";

const PlaceCard = ({rentOffer, handleRentHeaderClick, onMouseEnter, onMouseLeave, isNearby}) => {
  const {title, previewImg, type, rating, isBookmarked, isPremium, price} = rentOffer;

  return (
    <article className={isNearby ? `near-places__card place-card` : `cities__place-card place-card`}
      onMouseEnter={() => onMouseEnter(rentOffer)}
      onMouseLeave={() => onMouseLeave()}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ``}
      <div className={isNearby ? `near-places__image-wrapper place-card__image-wrapper` : `cities__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImg} width="260" height="200" alt="Place image"/>
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
            <span style={{width: `${rating * 100 / 5}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          onClick={() => {
            handleRentHeaderClick(rentOffer);
          }}
          className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  rentOffer: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    previewImg: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    isBookmarked: PropTypes.bool,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,
  isNearby: PropTypes.bool,
  handleRentHeaderClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onMouseEnter: ActionCreator.setHoveredCard,
  onMouseLeave: ActionCreator.removeHoveredCard
};

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);
