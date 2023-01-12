import axios from 'axios';
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
import { auth, updateOrder, updateWishList } from '../utils/resolvers';
import { Address, Product, ShopState, SimpleOrder, User } from '../utils/Type';
import { getAllProducts, searchProducts } from './ProductsResolvers';

const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  const [persistanceId, setPersistanceId] = useState<string>();
  const [user, setUser] = useState<User>();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<Product[]>([]);
  const [order, setOrder] = useState<SimpleOrder | undefined>({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [ordersCompleted, setOrdersCompleted] = useState<SimpleOrder[]>();
  const [addressList, setAddressList] = useState<Address[]>();
  const userAuth = auth.currentUser;

  const searchHandler = async (value: string) => {
    const result = await searchProducts(value);
    setSearchResult(result.products);
  };

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
        const currentWishList = await resolvers.getCurrentWishList(persistanceId);
        setWishList(currentWishList);
        const currentAddresses = await resolvers.getCurrentAddresses(persistanceId);
        setAddressList(currentAddresses);
        setIsLoading(false);
      }
    })();
  }, [persistanceId]);

  const getOrder = async (id: string) => {
    const currentOrder = await resolvers.getCurrentOrder(id);
    setOrder(currentOrder);
    const currentOrderCompleted = await resolvers.getCompletedOrders(id);
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

  const getProducts = async () =>
    await axios
      .get('https://fakestoreapi.com/products?limit=30')
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error));

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllProducts();
        setSearchResult(result.products);
      } catch (e) {
        console.log(e);
      }
    })();
    // setIsLoading(true);
    getProducts();
    // setIsLoading(false);
  }, []);

  const addItemToCart = async (product: Product) => {
    const productAlreadyOnBasket = order!.products.find(item => item.id === product.id);

    const newCartItems = productAlreadyOnBasket
      ? [
          ...order!.products.filter(i => i.id !== product.id),
          { ...productAlreadyOnBasket, amount: productAlreadyOnBasket.amount + 1 },
        ]
      : [...order!.products, { ...product, amount: 1 }];

    setOrder({ ...order, products: newCartItems });
    if (user) {
      updateOrder(newCartItems, user.id);
    }
  };

  const wishListHandler = (product: Product) => {
    const productAlreadyOnWishList = wishList.find(item => item.id === product.id);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== product.id) : [...wishList, product];
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
    updateOrder(newCartItems, user.id);
  };

  const deleteAllItemToCart = (id: string) => {
    if (!user) {
      return;
    }
    updateOrder(
      order!.products.filter(item => item.id !== id),
      user.id
    );
    setOrder({ ...order, products: order!.products.filter(item => item.id !== id) });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <CartContext.Provider
      value={{
        searchResult,
        addressList,
        order,
        getOrder,
        changePassword,
        changeEmail,
        wishListHandler,
        searchHandler,
        wishList,
        deleteAllItemToCart,
        logOut,
        user,
        products,
        deleteItemToCart,
        addItemToCart,
        login,
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
