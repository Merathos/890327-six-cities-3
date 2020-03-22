import * as React from "react";
import PlaceCard from "../place-card/place-card";
import {Offer} from "../../interfaces";

interface Props {
  offers: Offer[];
  isNearby: boolean;
}

const OffersList: React.FC<Props> = ({offers, isNearby}) => {
  return (
    <div className={isNearby ? `near-places__list places__list` : `cities__places-list places__list tabs__content`}>
      {offers.map((rentOffer) => <PlaceCard
        key={rentOffer.id}
        rentOffer={rentOffer}
        isNearby={isNearby}
      />)}
    </div>
  );
};

export default OffersList;
