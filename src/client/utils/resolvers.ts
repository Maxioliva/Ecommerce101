import callApi from './callApi';
import { Address, Basket, Product, UpdateBasketOptions, User, WishList } from './Type';

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

export const getBasket = async (userId: string) => {
  const basket = await callApi({ method: 'GET', endpoint: `/basket/${userId}` });
  return basket as Omit<Basket, 'id' | 'userId' | 'isCompleted'>;
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
  return orders as Omit<Basket, 'id' | 'userId' | 'isCompleted'>[];
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

export const uploadProduct = async (product: Omit<Product, 'id'>) => {
  await callApi({ method: 'POST', endpoint: '/products', payload: { ...product } });
};

export const getUserProduct = async (ownerId: string): Promise<Product[]> =>
  await callApi({ method: 'GET', endpoint: `/products/${ownerId}` });

export const getAllProducts = async (payload: { pagination?: string; filters?: any }) =>
  await callApi({
    method: 'GET',
    endpoint: `/products${payload.pagination ? `/?pagination=${payload.pagination}` : ''}`,
  });

export const getCurrentUser = async (userId: string): Promise<User> =>
  await callApi({ method: 'GET', endpoint: `/customer/${userId}` });

export const registerUser = async (user: Omit<User, 'uid'>) =>
  await callApi({
    method: 'POST',
    endpoint: '/customer/register',
    payload: user,
  });

export const updateUser = async (userId: string, stuffToUpdate: Partial<Omit<User, 'uid' | 'password'>>) =>
  await callApi({
    method: 'PUT',
    endpoint: `/customer/update/${userId}`,
    payload: stuffToUpdate,
  });
