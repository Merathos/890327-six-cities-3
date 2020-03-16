import {offersAdapter, commentsAdapter} from "../../api/adapter.js";
import uniqBy from 'lodash/uniqBy';
import {OperationStatus} from "../../utils/const.js";
import history from "../../history.js";

const Error = {
  UNAUTHORIZED: 401
};

const initialState = {
  offers: [],
  cities: [],
  currentCity: {},
  detailsOfferID: ``,
  nearbyOffers: [],
  comments: [],
  commentStatus: ``,
  bookmarkStatus: ``
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  SET_DETAILS_OFFER_ID: `SET_DETAILS_OFFER_ID`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  SET_OPERATION_STATUS: `SET_OPERATION_STATUS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  loadNearbyOffers: (offers) => {
    return {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers
    };
  },
  setDetailsOfferID: (id) => {
    return {
      type: ActionType.SET_DETAILS_OFFER_ID,
      payload: id
    };
  },
  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments
    };
  },
  setOperationStatus: (name, status) =>
    ({
      type: ActionType.SET_OPERATION_STATUS,
      payload: {
        name,
        status
      }
    }),
  updateOffers: (newOffer) =>
    ({
      type: ActionType.UPDATE_OFFERS,
      payload: newOffer
    })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data.map((offer) => offersAdapter(offer))));
      });
  },
  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
        .then((response) => {
          dispatch(ActionCreator.loadNearbyOffers(response.data.map((offer) => offersAdapter(offer))));
        });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
        .then((response) => {
          dispatch(ActionCreator.loadComments(response.data.map((comment) => commentsAdapter(comment))));
        });
  },
  addComment: ({comment, rating, id}) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setOperationStatus(`commentStatus`, OperationStatus.PENDING));
    return api.post(`/comments/${id}`,
        {
          comment,
          rating,
        })
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data.map((review) => commentsAdapter(review))));
        dispatch(ActionCreator.setOperationStatus(`commentStatus`, OperationStatus.SUCCESS));
      })
      .catch(() => {
        dispatch(ActionCreator.setOperationStatus(`commentStatus`, OperationStatus.FAILED));
      });
  },
  addBookmark: (id, status) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setOperationStatus(`bookmarkStatus`, OperationStatus.PENDING));
    return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      const newOffer = offersAdapter(response.data);

      dispatch(ActionCreator.updateOffers(newOffer));
      dispatch(ActionCreator.setOperationStatus(`bookmarkStatus`, OperationStatus.SUCCESS));
    })
    .catch((err) => {
      console.log(err)
      if (err.response && err.response.status === Error.UNAUTHORIZED) {
        history.push(`/login`);
      } else {
        dispatch(ActionCreator.setOperationStatus(`bookmarkStatus`, OperationStatus.FAILED));
      }
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {...state,
        currentCity: action.payload
      };

    case ActionType.LOAD_OFFERS:
      return {...state,
        offers: action.payload,
        cities: uniqBy(action.payload.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`),
        currentCity: uniqBy(action.payload.map((offer) => ({name: offer.city.name, coords: offer.city.coords, zoom: offer.city.zoom})), `name`)[0],
      };

    case ActionType.SET_DETAILS_OFFER_ID:
      return {...state,
        detailsOfferID: action.payload
      };

    case ActionType.LOAD_NEARBY_OFFERS:
      return {...state,
        nearbyOffers: action.payload
      };

    case ActionType.LOAD_COMMENTS:
      return {...state,
        comments: action.payload
      };

    case ActionType.SET_OPERATION_STATUS:
      const {name, status} = action.payload;
      return {...state,
        [name]: status
      };

    case ActionType.UPDATE_OFFERS:
      const {newOffer} = action.payload;
      const updatedOffers = state.offers.slice();
      const index = updatedOffers.findIndex((offer) => offer.id === newOffer.id.toString());
      updatedOffers[index] = newOffer;

      return {...state,
        offers: updatedOffers
      };
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
