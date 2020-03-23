import * as React from "react";
import OffersList from "../offers-list/offers-list";
import Map from "../map/map";
import CitiesList from "../cities-list/cities-list";
import SortingOptions from "../sorting-options/sorting-options";
import withActiveItem from "../../hocs/withActiveItem";
import {connect} from "react-redux";
import MainEmpty from "../main-empty/main-empty";
import {getCurrentCity, getSortedOffersByCity} from "../../reducer/data/selectors";
import {Offer, City} from "../../interfaces";

const SortingWrapped = withActiveItem(SortingOptions);

interface Props {
  offers: Offer[];
  currentCity: City;
}

const Main: React.FC<Props> = ({offers, currentCity}) => {
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
          <OffersList offers={offers} isNearby={false} />
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

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  offers: getSortedOffersByCity(state)
});

export {Main};
export default connect(mapStateToProps)(Main);
