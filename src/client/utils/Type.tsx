export type Language = 'en' | 'es';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  password: string;
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
  mainLoading: boolean;
  state: {
    user?: Omit<User, 'password'>;
    basket?: Basket; //Omit<Order, 'id' | 'userId' | 'isCompleted'>;
    wishList: Product[];
  };
  config: {
    language: Language;
    t: any;
    changeLanguage: (value: Language) => void;
    getString: (path: string) => string;
  };
  handlers: {
    register: (params: Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'gender'>) => Promise<void>;
    login: (params: Pick<User, 'email' | 'password'>) => Promise<void>;
    logOut: () => void;
    updateUserData: (id: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>) => Promise<void>;
    addItemToCart: (id: string) => Promise<void>;
    changeLanguage: (value: Language) => void;
    changePassword: (newPassword: string) => void;
    changeEmail: (newEmail: string) => void;
    confirmOrder: (selectedPayment: string) => Promise<void>;
    deleteItemToCart: (id: string) => void;
    deleteAllItemToCart: (id: string) => void;
    getAddresses: (userId: string) => Promise<Address[]>;
    // fetchProducts: (search?: string, skip?: number, limit?: number) => void;
    // searchProduct: (id: string) => Promise<FullProduct>;
    // searchHandler: (value: string) => void;
    // searchCategories: (value: string) => Promise<[]>;
    // handlerCategories: (value: string) => Promise<void>;
    wishListHandler: (id: string) => void;
    updateBasket: (basketOptions: UpdateBasketOptions) => Promise<any>;
    getOrders: (userId: string) => Promise<Omit<Order, 'id' | 'userId' | 'isCompleted'>[]>;
  };
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

export type SimpleOrder = Omit<Basket, 'id' | 'userId' | 'isCompleted'>;

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
  stock: number;
};

export type UpdateBasketOptions = {
  userId: string;
  products?: Product[];
  address?: Omit<Address, 'id' | 'userId'>;
  isCompleted?: boolean;
  payment?: string;
  completedAt?: number;
};
