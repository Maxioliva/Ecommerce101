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
  id: number;
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
  // userId: string;
};

export type ShopState = {
  userInfo?: User;
  userId?: string;
  cartItems: Product[];
  products: Product[];
  wishList: Product[];
  login: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  registerUser: (user: User & { password: string }) => Promise<void>;
  addItemToCart: (product: Product) => Promise<void>;
  deleteItemToCart: (id: number) => void;
  deleteAllItemToCart: (id: number) => void;
  wishListHandler: (product: Product) => void;
  changePassword: (newPassword: string) => void;
  changeEmail: (newEmail: string) => void;

  // createOrder: (products: Product[]) => Promise<void>;
};

export type Order = {
  id: string;
  userId: string;
  products: Product[];
  isCompleted: boolean;
};

export type WishList = {
  id: string;
  userId: string;
  products: Product[];
};
