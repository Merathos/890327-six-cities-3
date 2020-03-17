export const offersAdapter = (offer) => {
  return {
    id: offer.id.toString(),
    city: {
      name: offer.city.name,
      coords: [offer.city.location.latitude, offer.city.location.longitude],
      zoom: offer.city.location.zoom
    },
    coords: [offer.location.latitude, offer.location.longitude],
    zoom: offer.location.zoom,
    title: offer.title,
    previewImg: offer.preview_image,
    photos: offer.images,
    bedroomsAmount: offer.bedrooms,
    maxAdults: offer.max_adults,
    features: offer.goods,
    type: offer.type,
    rating: offer.rating,
    isBookmarked: offer.is_favorite,
    isPremium: offer.is_premium,
    price: offer.price,
    hostName: offer.host.name,
    hostAvatar: offer.host.avatar_url,
    hostStatus: offer.host.is_pro,
    description: offer.description
  };
};

export const commentsAdapter = (comment) => {
  return {
    id: comment.id.toString(),
    name: comment.user.name,
    avatar: comment.user.avatar_url,
    rating: comment.rating,
    date: comment.date,
    text: comment.comment
  };
};
