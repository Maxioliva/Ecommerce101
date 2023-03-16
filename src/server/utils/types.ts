export type User = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  password: string;
  // cartId?: string;
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
