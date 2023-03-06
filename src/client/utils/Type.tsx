export type Language = 'en' | 'es';

export type Basket = {
  products: Product[];
  total: number;
};

export type User = {
  uid: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  addresses: Address[];
  basket: Basket;
  wishList: Product[];
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

export type ContextValue = {
  state: {
    user?: Omit<User, 'password' | 'basket' | 'wishList' | 'addresses'>;
    basket: Basket;
    wishList: Product[];
    addresses: Address[];
  };
  basket?: SimpleOrder;
  config: {
    language: Language;
    t: any;
  };
  searchResult: SearchResult;
  handlers: {
    register: (params: Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'gender'>) => Promise<void>;
    login: (params: Pick<User, 'email' | 'password'>) => Promise<void>;
    logOut: () => void;
    updateUserData: (id: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>) => Promise<void>;
    addItemToCart: (id: string) => Promise<void>;
    confirmOrder: (selectedPayment: string) => Promise<void>;
    removeItemFromCart: (id: string) => void;
    removeAllItemsFromCart: (id: string) => void;
    wishListHandler: (id: string) => void;
    updateBasket: (basketOptions: UpdateBasketOptions) => Promise<any>;
    saveAddress: (address: Omit<Address, 'id' | 'userId'>, userId: string) => Promise<void>;
    getOrders: (userId: string) => Promise<Omit<Order, 'id' | 'userId' | 'isCompleted'>[]>;
    fetchProducts: (search?: string, skip?: number, limit?: number) => void;
    searchHandler: (value: string) => void;
    searchProduct: (id: string) => Promise<FullProduct>;
    searchCategories: (value: string) => Promise<[]>;
    handlerCategories: (value: string) => Promise<void>;
    changeLanguage: (value: Language) => void;
    getString: (path: string) => string;
  };
};

// export type ShopState = {
//   language: Language;
//   basket?: Omit<Order, 'id' | 'userId' | 'isCompleted'>;
//   searchResult: SearchResult;
//   t: any;
//   user?: Omit<User, 'password' | 'basket' | 'wishList' | 'addresses'>;
//   wishList: Product[];
//   addItemToCart: (id: string) => Promise<void>;
//   changeLanguage: (value: Language) => void;
//   confirmOrder: (selectedPayment: string) => Promise<void>;
//   deleteItemToCart: (id: string) => void;
//   deleteAllItemToCart: (id: string) => void;
//   fetchProducts: (search?: string, skip?: number, limit?: number) => void;
//   getString: (path: string) => string;
//   getAddresses: (userId: string) => Promise<Address[]>;
//   login: (params: Pick<User, 'email' | 'password'>) => Promise<void>;
//   logOut: () => void;
//   register: (params: Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'gender'>) => Promise<void>;
//   searchProduct: (id: string) => Promise<FullProduct>;
//   searchHandler: (value: string) => void;
//   updateUserData: (id: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>) => Promise<void>;
//   wishListHandler: (id: string) => void;
//   updateBasket: (basketOptions: UpdateBasketOptions) => Promise<any>;
//   getOrders: (userId: string) => Promise<Omit<Order, 'id' | 'userId' | 'isCompleted'>[]>;
//   searchCategories: (value: string) => Promise<[]>;
//   handlerCategories: (value: string) => Promise<void>;
// };

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
