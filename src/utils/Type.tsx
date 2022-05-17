export type User = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  password: string;
};

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  amount: number;
};

export type ShopState = {
  login: (email: string, password: string) => Promise<void>;
  registerUser: (user: User) => Promise<void>;
  cartItems: Product[];
  addItemToCart: (product: Product) => Promise<void>;
  products: Product[];
  deleteItemToCart: any;
};

export type Item = {
  id: number;
  title: string;
  image: string;
  price: number;
  amount: number;
};
