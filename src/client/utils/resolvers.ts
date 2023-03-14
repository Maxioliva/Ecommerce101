import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import callApi from './callApi';
import firebaseApp from './firebaseApp';
import { Address, Order, SellerProduct, Product, UpdateBasketOptions, User, WishList } from './Type';

export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const getCurrentUser = async (userId: string) => {
  const q = query(collection(firestore, 'User'), where('id', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentUser = querySnapshot.docs[0];
  return currentUser?.data() as User;
};

export const updateUser = async (firstName: string, lastName: string, email: string, id: string) => {
  const q = query(collection(firestore, 'User'), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  const currentUser = querySnapshot.docs[0];
  const docuRef = await doc(firestore, `User/${currentUser.id}`);

  return await setDoc(docuRef, { id, lastName, firstName, email });
};

export const registerUser = async (user: User & { password: string }) => {
  const infoUser = await createUserWithEmailAndPassword(auth, user.email, user.password).then(
    userFirebase => userFirebase
  );
  const userId = infoUser.user.uid;
  const docuRef = await doc(firestore, `User/${infoUser.user.uid}`);

  const newUser = {
    id: userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
  };
  await setDoc(docuRef, newUser);
  return newUser;
};

export const saveAddress = async (address: Omit<Address, 'id' | 'userId'>, userId: string) => {
  await callApi({ method: 'PUT', endpoint: '/customer/address', payload: { userId, address } });
};

export const deleteAddress = async (id: string) => {
  const addresses: Address[] = await callApi({ method: 'DELETE', endpoint: `/customer/address/${id}` });
  return addresses;
};
export const getAddresses = async (userId: string) => {
  const addresses: Address[] = await callApi({ method: 'GET', endpoint: `/customer/address/${userId}` });
  return addresses;
};

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

export const uploadProduct = async (product: Omit<SellerProduct, 'id'>) => {
  await callApi({ method: 'POST', endpoint: '/products', payload: { ...product } });
};

export const getUserProduct = async (ownerId: string): Promise<SellerProduct[]> =>
  await callApi({ method: 'GET', endpoint: `/Produts/${ownerId}` });

export const getWishList = async (userId: string) => {
  const wishlistFromServer = await callApi({ method: 'GET', endpoint: `/wishlist/${userId + '-w'}` });

  if (wishlistFromServer.products.length) {
    return (wishlistFromServer as WishList).products;
  }
  return [];
};

export const updateWishList = async (products: Product[], userId: string) => {
  await callApi({ method: 'PUT', endpoint: '/wishlist', payload: { userId, products } });
};
