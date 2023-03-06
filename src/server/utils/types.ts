export type User = {
  uid: string;
  email: string;
  password: string;
  gender: string;
  firstName: string;
  lastName: string;
  basket: string[];
  wishList: string[];
  addresses: string[];
};

export type Basket = {
  products: Product[];
  total: number;
};

export type Product = {
  id: string;
  title: string;
  images: string[];
  price: number;
  category: string;
  amount: number;
  rating: number;
  description: string;
  stock: number;
  discountPercentage: number;
  brand: string;
  thumbnail: string;
};
