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
  image: string;
  price: number;
  category: string;
  amount: number;
  rating: { rate: number; count: number };
};

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
  id: string;
  userId: string;
};

export type ShopState = {
  addressList?: Address[];
  user?: User;
  products: Product[];
  wishList: Product[];
  order?: Omit<Order, 'id' | 'userId' | 'isCompleted'>;
  login: (email: string, password: string) => Promise<User>;
  logOut: () => void;
  registerUser: (user: User & { password: string }) => Promise<User>;
  addItemToCart: (product: Product) => Promise<void>;
  deleteItemToCart: (id: string) => void;
  deleteAllItemToCart: (id: string) => void;
  wishListHandler: (product: Product) => void;
  changePassword: (newPassword: string) => void;
  changeEmail: (newEmail: string) => void;
  getOrder: (id: string) => Promise<void>;

  // createOrder: (products: Product[]) => Promise<void>;
};

export type Order = {
  id: string;
  userId: string;
  products: Product[];
  isCompleted: boolean;
  address?: Omit<Address, 'id'>[];
  completedAt?: Date;
};

export type SimpleOrder = Omit<Order, 'id' | 'userId' | 'isCompleted'>;

export type WishList = {
  id: string;
  userId: string;
  products: Product[];
};
