/* eslint-disable no-nested-ternary */
import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/application/application";
import {Link} from 'react-router-dom';
import {Operation as DataOperation} from "../../reducer/data/data";
import {getBookmarkStatus} from "../../reducer/data/selectors";
import {OperationStatus} from "../../utils/const";
import {Offer} from "../../interfaces";

interface Props {
  rentOffer: Offer;
  onMouseEnter: (rentOffer: Offer) => void;
  onMouseLeave: () => void;
  isNearby: boolean;
  handleBookmarkClick: (id: string, isBookmarked: number) => void;
  bookmarkStatus: string;
  onFavoritesList: boolean;
}

const PlaceCard: React.FC<Props> = ({rentOffer, onMouseEnter, onMouseLeave, isNearby, handleBookmarkClick, bookmarkStatus, onFavoritesList}) => {
  const {title, previewImg, type, rating, isBookmarked, isPremium, price, id} = rentOffer;
  const onBookmarkClick = () => handleBookmarkClick(id, isBookmarked ? 0 : 1);

  return (
    <article className={onFavoritesList ? `favorites__card place-card` : isNearby ? `near-places__card place-card` : `cities__place-card place-card`}
      onMouseEnter={() => onMouseEnter(rentOffer)}
      onMouseLeave={() => onMouseLeave()}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ``}
      <div className={onFavoritesList ? `favorites__image-wrapper place-card__image-wrapper` : isNearby ? `near-places__image-wrapper place-card__image-wrapper` : `cities__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImg} width={onFavoritesList ? `150` : `260`} height={onFavoritesList ? `110` : `200`} alt="Place image"/>
        </a>
      </div>
      <div className={`${onFavoritesList ? `favorites__card-info ` : ``}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isBookmarked ? `place-card__bookmark-button--active ` : ``}${bookmarkStatus === OperationStatus.FAILED ? `place-card__bookmark-button--error` : ``}`} type="button" onClick={onBookmarkClick}>
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
          className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  bookmarkStatus: getBookmarkStatus(state)
});

const mapDispatchToProps = {
  onMouseEnter: ActionCreator.setHoveredCard,
  onMouseLeave: ActionCreator.removeHoveredCard,
  handleBookmarkClick: DataOperation.addBookmark
};

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
