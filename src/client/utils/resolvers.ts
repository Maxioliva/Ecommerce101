import { getAuth } from 'firebase/auth';
import callApi from './callApi';
import firebaseApp from './firebaseApp';
import { Address, Order, Product, UpdateBasketOptions, User, WishList } from './Type';

export const auth = getAuth(firebaseApp);

export const registerUser = async (user: Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'gender'>) =>
  await callApi({
    method: 'POST',
    endpoint: '/customer/register',
    payload: user,
  });

export const getCurrentUser = async (userId: string): Promise<User> =>
  await callApi({ method: 'GET', endpoint: `/customer/${userId}` });

export const updateUser = async (userId: string, stuffToUpdate: Partial<Omit<User, 'id' | 'password'>>) =>
  await callApi({
    method: 'PUT',
    endpoint: `/customer/update/${userId}`,
    payload: stuffToUpdate,
  });

export const getBasket = async (userId: string) => {
  const basket = await callApi({ method: 'GET', endpoint: `/basket/${userId}` });
  return basket as Omit<Order, 'id' | 'userId' | 'isCompleted'>;
};

export const updateBasket = async (basketOptions: UpdateBasketOptions) => {
  const { userId, products, address, isCompleted, payment, completedAt } = basketOptions;

  const basket = await callApi({
    method: 'PUT',
    endpoint: '/basket',
    payload: {
      userId,
      ...(address && { address }),
      ...(payment && { payment }),
      ...(products && { products }),
      ...(completedAt && { completedAt }),
      ...(isCompleted && { isCompleted }),
    },
  });

  return basket;
};

export const getOrders = async (userId: string) => {
  const orders = await callApi({ method: 'GET', endpoint: `/customer/orders/${userId}` });
  return orders as Omit<Order, 'id' | 'userId' | 'isCompleted'>[];
};

export const getWishList = async (userId: string) => {
  const wishlistFromServer = await callApi({ method: 'GET', endpoint: `/wishlist/${userId + '-w'}` });

  if (wishlistFromServer.products) {
    return (wishlistFromServer as WishList).products;
  }
  return [];
};

export const updateWishList = async (products: Product[], userId: string) => {
  await callApi({ method: 'PUT', endpoint: '/wishlist', payload: { userId, products } });
};

export const getAddresses = async (userId: string) => {
  const addresses: Address[] = await callApi({ method: 'GET', endpoint: `/customer/address/${userId}` });
  return addresses;
};

export const saveAddress = async (address: Omit<Address, 'id' | 'userId'>, userId: string) => {
  await callApi({ method: 'PUT', endpoint: '/customer/address', payload: { userId, address } });
};

export const deleteAddress = async (id: string) => {
  const addresses: Address[] = await callApi({ method: 'DELETE', endpoint: `/customer/address/${id}` });
  return addresses;
};
