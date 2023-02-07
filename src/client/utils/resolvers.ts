import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import isequal from 'lodash.isequal';
import { nanoid } from 'nanoid';
import callApi from './callApi';
import firebaseApp from './firebaseApp';
import { Address, Order, Product, User, WishList } from './Type';

export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

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

export const updateAdress = async (address: Omit<Address, 'id' | 'userId'>, userId: string) => {
  const orders = await callApi({ method: 'PUT', endpoint: ' /customer/orders', payload: { userId, address } });

  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentBasket = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
  const docuRef = await doc(firestore, `Orders/${currentBasket?.id}`);
  await updateDoc(docuRef, { address });
};
export const updatePayment = async (userId: string, payment: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentBasket = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
  const docuRef = await doc(firestore, `Orders/${currentBasket?.id}`);
  const dateInSeconds = Timestamp.fromDate(new Date()).seconds;
  await updateDoc(docuRef, { isCompleted: true, payment, completedAt: dateInSeconds });
};

type UpdateBasketOptions = {
  userId: string;
  products?: Product[];
  address?: Omit<Address, 'id' | 'userId'>;
  isCompleted?: boolean;
  payment?: string;
  completedAt?: number;
};

export const updateBasket = async ({
  userId,
  products,
  address,
  isCompleted,
  payment,
  completedAt,
}: UpdateBasketOptions) => {
  const basket = await callApi({
    method: 'PUT',
    endpoint: `/basket`,
    payload: {
      userId,
      ...(products && { products }),
      ...(address && { address }),
      ...(payment && { payment }),
      ...(completedAt && { completedAt }),
      ...(isCompleted && { isCompleted }),
    },
  });
  return basket;
};

export const getBasket = async (userId: string) => {
  const basket = await callApi({ method: 'GET', endpoint: `/basket/${userId}` });
  return basket as Omit<Order, 'id' | 'userId' | 'isCompleted'>;
};

export const getOrders = async (userId: string) => {
  const orders = await callApi({ method: 'GET', endpoint: `/customer/orders/${userId}` });
  return orders as Omit<Order, 'id' | 'userId' | 'isCompleted'>[];
  // // const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  // // const querySnapshot = await getDocs(q);
  // if (querySnapshot.docs.length && querySnapshot.docs.some(o => (o.data() as Order).isCompleted)) {
  //   const previousOrders = querySnapshot.docs.filter(d => (d.data() as Order).isCompleted);
  //   return previousOrders.map(o => o.data() as Omit<Order, 'id' | 'userId' | 'isCompleted'>);
  // }
  // return [];
};

export const updateWishList = async (products: Product[], userId: string) => {
  await callApi({ method: 'PUT', endpoint: `/wishlist`, payload: { userId, products } });
};

export const getWishList = async (userId: string) => {
  // retornar el callApi y guardarlo en una constante
  const wishlistFromServer = await callApi({ method: 'GET', endpoint: `/wishlist/${userId + '-w'}` });
  if (wishlistFromServer.products.length) {
    return (wishlistFromServer as WishList).products;
  }
  return [];
};

export const sanitizeAddress = async (address: Omit<Address, 'id' | 'userId'>, usuarioId: string) => {
  const q = query(collection(firestore, 'Addresses'), where('userId', '==', usuarioId));
  const querySnapshot = await getDocs(q);
  const vevo = (d: QueryDocumentSnapshot) => {
    const vevo2 = d.data() as Address;
    const { id, userId, ...rest } = vevo2;

    return rest;
  };

  const allReadyInMemory = querySnapshot.docs.find(d => isequal(vevo(d), address));

  if (!allReadyInMemory) {
    const addressId = nanoid();
    const docuRef = await doc(firestore, `Addresses/${addressId}`);
    await setDoc(docuRef, { userId: usuarioId, ...address, id: addressId });
  }
};

export const getAddresses = async (userId: string) => {
  const addresses: Address[] = await callApi({ method: 'GET', endpoint: `/customer/address/${userId}` });

  // const q = query(collection(firestore, 'Addresses'), where('userId', '==', userId));
  // const querySnapshot = await getDocs(q);

  // if (querySnapshot.docs.length) {
  //   const currentAddresList = querySnapshot.docs.map(address => address?.data() as Address);
  //   return currentAddresList;
  // }
  return addresses;
};

export const deleteAddresses = async (id: string) => {
  try {
    const docuRef = await doc(firestore, 'Addresses', id);
    await deleteDoc(docuRef);
  } catch (e: any) {
    console.log(e);
  }
};
