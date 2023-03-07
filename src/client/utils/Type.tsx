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

export type SellProduct = {
  idOuner: string;
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
  language: Language;
  basket?: Omit<Order, 'id' | 'userId' | 'isCompleted'>;
  searchResult: SearchResult;
  t: any;
  user?: User;
  wishList: Product[];
  addItemToCart: (id: string) => Promise<void>;
  changeLanguage: (value: Language) => void;
  changePassword: (newPassword: string) => void;
  changeEmail: (newEmail: string) => void;
  confirmOrder: (selectedPayment: string) => Promise<void>;
  deleteItemToCart: (id: string) => void;
  deleteAllItemToCart: (id: string) => void;
  fetchProducts: (search?: string, skip?: number, limit?: number) => void;
  getString: (path: string) => string;
  getAddresses: (userId: string) => Promise<Address[]>;
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  register: (newUser: User & { password: string }) => Promise<User>;
  searchProduct: (id: string) => Promise<FullProduct>;
  searchHandler: (value: string) => void;
  wishListHandler: (id: string) => void;
  // createOrder: (products: Product[]) => Promise<void>;
  updateBasket: (basketOptions: UpdateBasketOptions) => Promise<any>;
  getOrders: (userId: string) => Promise<Omit<Order, 'id' | 'userId' | 'isCompleted'>[]>;
  searchCategories: (value: string) => Promise<[]>;
  handlerCategories: (value: string) => Promise<void>;
  selectState: (value: string) => void;
  colors: string;
};

export type Order = {
  id: string;
  userId: string;
  products: Product[];
  isCompleted: boolean;
  address?: Omit<Address, 'id'>[];
  completedAt?: number;
  paymentMethod?: string;
  total?: number;
};

export type Transaction = {
  id: string;
  idBuyer: string;
  idSeller: string;
  product: Product[];
  address?: Omit<Address, 'id'>[];
  completedAt?: number;
  paymentMethod?: string;
  total: number;
};

export type SimpleOrder = Omit<Order, 'id' | 'userId' | 'isCompleted'>;

export type WishList = {
  id: string;
  userId: string;
  products: Product[];
};

export type SearchResult = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type UpdateBasketOptions = {
  userId: string;
  products?: Product[];
  address?: Omit<Address, 'id' | 'userId'>;
  isCompleted?: boolean;
  payment?: string;
  completedAt?: number;
};

export type SellerProduct = {
  id: string;
  ownerId?: string;
  title: string;
  description: string;
  brand: string;
  colors: string[];
  categories: string[];
  images: string[];
  rating?: number;
  price: string;
};
