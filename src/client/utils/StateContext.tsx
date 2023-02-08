import axios from 'axios';
import { table } from 'console';
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/loadingSpinner';
import * as resolvers from '../utils/resolvers';
import { auth, updateBasket, updateWishList } from '../utils/resolvers';
import { Address, FullProduct, Language, Product, SearchResult, ShopState, SimpleOrder, User } from '../utils/Type';
import callApi from './callApi';
import { getAllProducts, searchProduct, searchProducts } from './ProductsResolvers';

const CartContext = createContext<ShopState>({} as ShopState);
const translations = require('./translations.json');

export const CartProvider = ({ children }: any) => {
  const [persistanceId, setPersistanceId] = useState<string>();
  const [user, setUser] = useState<User>();
  const [wishList, setWishList] = useState<Product[]>([]);
  const [order, setOrder] = useState<SimpleOrder | undefined>({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>({ products: [], total: 0, skip: 0, limit: 0 });
  const [ordersCompleted, setOrdersCompleted] = useState<SimpleOrder[]>();
  const [addressList, setAddressList] = useState<Address[]>();
  const [language, setLanguaje] = useState<Language>('en');
  const userAuth = auth.currentUser;

  const changeLanguage = (value: Language) => setLanguaje(value);

  async function searchHandler(value: string) {
    const result = await searchProducts(value);
    setSearchResult(result);
  }

  const login = async (email: string, password: string) => {
    const userInstance = await signInWithEmailAndPassword(auth, email, password);
    await setPersistence(auth, browserLocalPersistence);
    const firestoreUser = await resolvers.getCurrentUser(userInstance.user.uid);
    setUser(firestoreUser);
  };

  const registerHandler = async (_user: User & { password: string }) => {
    const userInstance = await resolvers.registerUser(_user);
    setUser(userInstance);
    return userInstance;
  };

  onAuthStateChanged(auth, _firebaseAuthUser => {
    if (_firebaseAuthUser?.uid && _firebaseAuthUser?.uid !== persistanceId) {
      setPersistanceId(_firebaseAuthUser.uid);
    }
  });

  useEffect(() => {
    (async () => {
      if (persistanceId) {
        // const ordersFromServer = await callApi({ method: 'GET', endpoint: `/orders/${persistanceId}` });
        // console.log('ordersFromServer', ordersFromServer);
        const firestoreUser = await resolvers.getCurrentUser(persistanceId);
        setUser(firestoreUser);
        await getOrder(persistanceId);
        const currentWishList = await resolvers.getWishList(persistanceId);
        setWishList(currentWishList);
        const currentAddresses = await resolvers.getAddresses(persistanceId);
        setAddressList(currentAddresses);
        setIsLoading(false);
      }
    })();
  }, [persistanceId]);

  const getOrder = async (id: string) => {
    const currentOrder = await resolvers.getBasket(id);
    setOrder(currentOrder);
    const currentOrderCompleted = await resolvers.getOrders(id);
    setOrdersCompleted(currentOrderCompleted);
  };

  const changePassword = async (newPassword: string) => {
    try {
      await updatePassword(userAuth!, newPassword).then(() => {
        window.alert('Password Succesfull Changed');
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('weak-password')) {
        console.log(error.message);
        window.alert('Password should be at least 6 characters');
      }
    }
  };

  const changeEmail = async (newEmail: string) => {
    try {
      await updateEmail(userAuth!, newEmail);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setUser(undefined);
        setOrder(undefined);
        setWishList([]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchProducts = async (search?: string, skip?: number, limit?: number) => {
    const response = await getAllProducts(search, skip, limit);
    setSearchResult({ ...response, products: [...searchResult.products, ...response.products] });
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const addItemToCart = async (id: string) => {
    const productAlreadyOnBasket = order!.products.find(item => item.id === id);
    const product = searchResult.products.find(item => item.id === id);
    const newCartItems = productAlreadyOnBasket
      ? [
          ...order!.products.filter(i => i.id !== id),
          { ...productAlreadyOnBasket, amount: productAlreadyOnBasket.amount + 1 },
        ]
      : [...order!.products, { ...product!, amount: 1 }];

    setOrder({ ...order, products: newCartItems });
    if (user) {
      updateBasket({ userId: user.id, products: newCartItems });
    }
  };

  const wishListHandler = (id: string) => {
    const productAlreadyOnWishList = wishList.find(item => item.id === id);
    const product = searchResult.products.find(item => item.id === id);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== id) : [...wishList, product!];
    setWishList(newWishList);
    if (user) {
      updateWishList(newWishList, user.id);
    }
  };

  const deleteItemToCart = (itemId: string) => {
    if (!user) {
      return;
    }
    const itemToRemove = order!.products.find(({ id }) => itemId === id);

    const newCartItems =
      itemToRemove!.amount > 1
        ? order!.products.map(item => ({ ...item, amount: item.id === itemId ? item!.amount - 1 : item.amount }))
        : order!.products.filter(item => item.id !== itemId);
    setOrder({ ...order, products: newCartItems });
    updateBasket({ userId: user.id, products: newCartItems });
  };

  const deleteAllItemToCart = (id: string) => {
    if (!user) {
      return;
    }
    updateBasket({ userId: user.id, products: order!.products.filter(item => item.id !== id) });
    setOrder({ ...order, products: order!.products.filter(item => item.id !== id) });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const getString: (path: string) => string = path => {
    const properties = path.split('.');
    return properties.reduce((acc, curr) => acc?.[curr], translations[language]);
  };

  return (
    <CartContext.Provider
      value={{
        addressList,
        language,
        order,
        searchResult,
        t: translations[language],
        user,
        wishList,
        addItemToCart,
        changePassword,
        changeLanguage,
        changeEmail,
        deleteAllItemToCart,
        deleteItemToCart,
        fetchProducts,
        getOrder,
        getString,
        login,
        logOut,
        searchHandler,
        searchProduct,
        wishListHandler,
        ...{
          ...resolvers,
          register: (newUser: User & { password: string }) => registerHandler(newUser),
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
