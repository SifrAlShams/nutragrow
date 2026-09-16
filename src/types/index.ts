export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capsules: number;
  ingredients: Ingredient[];
  benefits: string[];
  usage: string[];
  certifications: string[];
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
