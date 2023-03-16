export type Language = 'en' | 'es';

export type User = {
  // id: string;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  // password: string;
  // cartId?: string;
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
  mainLoading: boolean;
  state: {
    user?: Omit<User, 'password'>;
    basket: Basket;
    wishList: SellerProduct[];
  };
  config: {
    language: Language;
    t: any;
    changeLanguage: (value: Language) => void;
    getString: (path: string) => string;
  };
  handlers: {
    register: (newUser: Omit<User, 'uid'> & { password: string }) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    addItemToCart: (id: string) => Promise<void>;
    updateUserData: (value: Omit<User, 'uid' | 'gender'> & { password: string }) => Promise<void>;
    confirmOrder: (selectedPayment: string) => Promise<void>;
    deleteItemToCart: (id: string) => void;
    deleteAllItemToCart: (id: string) => void;
    fetchProducts: (search?: string, skip?: number, limit?: number) => void;
    getAddresses: (userId: string) => Promise<Address[]>;
    searchProduct: (id: string) => Promise<SellerProduct>;
    searchHandler: (value: string) => void;
    wishListHandler: (id: string) => void;
    updateBasket: (basketOptions: UpdateBasketOptions) => Promise<any>;
    getOrders: (userId: string) => Promise<Omit<Basket, 'id' | 'userId' | 'isCompleted'>[]>;
    searchCategories: (value: string) => Promise<[]>;
    handlerCategories: (value: string) => Promise<void>;
  };
};

// Aca cambie Orders por Basket
export type Basket = {
  id: string;
  userId: string;
  products: SellerProduct[];
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
  product: SellerProduct[];
  address?: Omit<Address, 'id'>[];
  completedAt?: number;
  paymentMethod?: string;
  total: number;
};

export type SimpleOrder = Omit<Basket, 'id' | 'userId' | 'isCompleted'>;

export type WishList = {
  id: string;
  userId: string;
  products: SellerProduct[];
};

export type SearchResult = {
  products: SellerProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type UpdateBasketOptions = {
  userId: string;
  products?: SellerProduct[];
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
  stock?: number;
};
