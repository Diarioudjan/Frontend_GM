export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  image: string;
  shippingCost: number;
  totalProducts: number;
  totalOrders: number;
  averageRating: number;
}
