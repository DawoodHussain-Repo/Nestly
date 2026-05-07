export interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  type: 'apartment' | 'house' | 'villa' | 'cabin';
  bedrooms: number;
  bathrooms: number;
  guests: number;
  description?: string;
  amenities?: string[];
}
