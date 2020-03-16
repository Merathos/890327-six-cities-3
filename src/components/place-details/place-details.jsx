import React from "react";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import {connect} from 'react-redux';
import {getDetailsOffer, getNearbyOffers, getComments, getBookmarkStatus} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/data/data.js";
import withValues from "../../hocs/with-values.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {OperationStatus} from "../../utils/const.js";

const ReviewFormWrapped = withValues(ReviewForm);

class PlaceDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onBookmarkClick = this.onBookmarkClick.bind(this);
  }

  componentDidMount() {
    this.props.setDetailsOfferID(this.props.match.params.id);
    this.props.loadComments(this.props.match.params.id);
    this.props.loadNearbyOffers(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      window.scrollTo({
        top: 0,
        behavior: `smooth`
      });

      this.props.setDetailsOfferID(this.props.match.params.id);
      this.props.loadComments(this.props.match.params.id, 10);
      this.props.loadNearbyOffers(this.props.match.params.id);
    }
  }

  onBookmarkClick() {
    const {rentOffer: {id, isBookmarked}} = this.props;
    const status = isBookmarked ? 0 : 1;
    this.props.handleBookmarkClick(id, status);
  }

  render() {
    if (!this.props.rentOffer) {
      return null;
    }
    const {comments, nearbyOffers, bookmarkStatus} = this.props;
    const {
      id,
      title,
      photos,
      bedroomsAmount,
      maxAdults,
      features,
      type,
      rating,
      isPremium,
      isBookmarked,
      price,
      hostName,
      hostAvatar,
      hostStatus,
      description
    } = this.props.rentOffer;

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {photos.slice(0, 6).map((img, i) =>
                <div key={`${i}${img}`} className="property__image-wrapper">
                  <img className="property__image" src={img} alt="Photo studio" />
                </div>
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>
                    Premium
                  </span>
                </div> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button button${isBookmarked ? ` property__bookmark-button--active` : ``}${bookmarkStatus === OperationStatus.FAILED ? ` property__bookmark-button--error` : ``}`} type="button" onClick={this.onBookmarkClick}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating * 100 / 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedroomsAmount} bedroom${bedroomsAmount > 1 ? `s` : ``}`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} adult${maxAdults > 1 ? `s` : ``}`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;
                  {price}
                </b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {features.map((feature, i) =>
                    <li key={`${i}${feature}`} className="property__inside-item">
                      {feature}
                    </li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${hostStatus ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={hostAvatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {hostName}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={comments} />
                {this.props.isAuthorized ? <ReviewFormWrapped id={id} /> : ``}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offersCoords = {nearbyOffers.slice(0, 3).map((offer)=>offer.coords)} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers.slice(0, 3)} isNearby = {true} />
          </section>
        </div>
      </main>
    );
  }
}

PlaceDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  rentOffer: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
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
  }),
  setDetailsOfferID: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  loadNearbyOffers: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })),
  nearbyOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        coords: PropTypes.array.isRequired,
        title: PropTypes.string,
        city: PropTypes.object,
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
  ),
  changeCity: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  bookmarkStatus: PropTypes.string,
  handleBookmarkClick: PropTypes.func
};

const mapStateToProps = (state) => ({
  rentOffer: getDetailsOffer(state),
  nearbyOffers: getNearbyOffers(state),
  comments: getComments(state),
  isAuthorized: getAuthStatus(state),
  bookmarkStatus: getBookmarkStatus(state)
});

const mapDispatchToProps = {
  setDetailsOfferID: ActionCreator.setDetailsOfferID,
  loadComments: DataOperation.loadComments,
  loadNearbyOffers: DataOperation.loadNearbyOffers,
  changeCity: ActionCreator.changeCity,
  handleBookmarkClick: DataOperation.addBookmark
};

export {PlaceDetails};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
