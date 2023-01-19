import { Timestamp } from 'firebase/firestore';
import { type } from 'os';

export type Language = 'en' | 'es';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  // password: string;
  // cartId?: string;
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
};

export type FullProduct = Product & {
  description: string;
  brand: string;
  thumbnail: string;
};

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
  id: string;
  userId: string;
};

export type ShopState = {
  addressList?: Address[];
  language: Language;
  order?: Omit<Order, 'id' | 'userId' | 'isCompleted'>;
  products: Product[];
  searchResult: Product[];
  t: any;
  user?: User;
  wishList: Product[];
  addItemToCart: (id: string) => Promise<void>;
  changeLanguage: (value: Language) => void;
  changePassword: (newPassword: string) => void;
  changeEmail: (newEmail: string) => void;
  deleteItemToCart: (id: string) => void;
  deleteAllItemToCart: (id: string) => void;
  getOrder: (id: string) => Promise<void>;
  getString: (path: string) => String;
  getCurrentAddresses: (userId: string) => Promise<Address[]>;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  register: (newUser: User & { password: string }) => Promise<User>;
  searchProduct: (id: string) => Promise<FullProduct>;
  searchHandler: (value: string) => void;
  wishListHandler: (id: string) => void;

  // createOrder: (products: Product[]) => Promise<void>;
  getCompletedOrders: (userId: string) => Promise<Omit<Order, 'id' | 'userId' | 'isCompleted'>[]>;
};

export type Order = {
  id: string;
  userId: string;
  products: Product[];
  isCompleted: boolean;
  address?: Omit<Address, 'id'>[];
  completedAt?: Timestamp;
  paymentMethod?: string;
  total?: number;
};

export type SimpleOrder = Omit<Order, 'id' | 'userId' | 'isCompleted'>;

export type WishList = {
  id: string;
  userId: string;
  products: Product[];
};
