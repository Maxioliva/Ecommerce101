export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  password: string;
  cartId?: string;
};

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  amount: number;
  rating: { rate: number; count: number };
};

export type ShopState = {
  userId?: string;
  cartItems: Product[];
  products: Product[];
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  registerUser: (user: Omit<User, 'id'>) => Promise<void>;
  addItemToCart: (product: Product) => Promise<void>;
  deleteItemToCart: (id: number) => void;
  deleteAllItemToCart: (id: number) => void;

  // createOrder: (products: Product[]) => Promise<void>;
};

export type Order = {
  id: string;
  userId: string;
  products: Product[];
  isCompleted: boolean;
};
