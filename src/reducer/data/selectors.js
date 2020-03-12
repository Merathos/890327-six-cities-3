import {createSelector} from "reselect";
import {sortOffers} from "../../utils/utils.js";
import NameSpace from "../name-space";

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getCurrentCity = (state) => {
  return state[NameSpace.DATA].currentCity;
};

export const getSortType = (state) => {
  return state[NameSpace.APPLICATION].currentSortType;
};

export const getSortedOffersByCity = createSelector([getOffers, getCurrentCity, getSortType], (offers, currentCity, currentSortType) => {
  sortOffers(currentSortType, offers.filter((offer) => offer.city.name === currentCity.name));
});
