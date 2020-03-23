export interface City {
  name: string;
  coords: [number, number];
  zoom: number;
};

export interface Offer {
  id: string;
  city: City;
  coords: [number, number];
  zoom: number;
  title: string;
  previewImg: string;
  photos: string[];
  bedroomsAmount: number;
  maxAdults: number;
  features: string[];
  type: string;
  rating: number;
  isBookmarked: boolean;
  isPremium: boolean;
  price: number;
  hostName: string;
  hostAvatar: string;
  hostStatus: boolean;
  description: string;
};

export interface User {
  avatar_url: string;
  email: string;
  id: number;
  is_pro: boolean;
  name: string;
}

export interface Comment {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}
