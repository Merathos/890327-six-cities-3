const SORT_TYPES = {
  POPULAR: `Popular`,
  PRICE_FROM_LOW: `Price: low to high`,
  PRICE_FROM_HIGH: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

export const sortOffers = (sortType, offers) => {
  switch (sortType) {
    case SORT_TYPES.PRICE_FROM_LOW:
      return offers.slice().sort((a, b) => a.price - b.price);

    case SORT_TYPES.PRICE_FROM_HIGH:
      return offers.slice().sort((a, b) => b.price - a.price);

    case SORT_TYPES.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);

    case SORT_TYPES.POPULAR:
      return offers;

    default:
      return offers;
  }
};
