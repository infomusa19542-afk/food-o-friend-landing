export interface RestaurantOwnerData {
  restaurantName: string;
  contactName: string;
  email: string;
  phone?: string;
  city: string;
  address?: string;
  cuisineType: string;
  websiteOrInstagram?: string;
  seatingCapacity: number;
  interestedInHosting: boolean;
  message: string;
}
