/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import axios from 'axios';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import * as resolvers from '../utils/resolvers';
import { updateOrder, updateWishList } from '../utils/resolvers';
import { Product, ShopState, User } from '../utils/Type';

const CartContext = createContext<ShopState>({} as ShopState);

const auth = getAuth(firebaseApp);

export const CartProvider = ({ children }: any) => {
  const user = auth.currentUser;

  const [userId, setUserId] = useState<string>();
  const [userInfo, setUserInfo] = useState<User>();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<Product[]>([]);

  onAuthStateChanged(auth, userFirebase => {
    (async () => {
      if (userFirebase && userId !== userFirebase?.uid) {
        setUserId(userFirebase?.uid);
        const currentBasket = await resolvers.getCurrentBasket(userFirebase?.uid);
        setCartItems(currentBasket);
        const currentWishList = await resolvers.getCurrentWishList(userFirebase?.uid);
        setWishList(currentWishList);
        const currentUser = await resolvers.getCurrentUser(userFirebase?.uid);
        setUserInfo(currentUser);
      }
    })();
  });

  // useEffect(() => {
  //   async () => {
  //     if (user && userId !== user?.uid) {
  //       setUserId(user?.uid);
  //       const currentBasket = await resolvers.getCurrentBasket(user?.uid);
  //       setCartItems(currentBasket);
  //       const currentWishList = await resolvers.getCurrentWishList(user?.uid);
  //       setWishList(currentWishList);
  //       const currentUser = await resolvers.getCurrentUser(user?.uid);
  //       setUserInfo(currentUser);
  //     }
  //   };
  // }, [user]);

  const changePassword = async (newPassword: string) => {
    try {
      await updatePassword(user!, newPassword).then(() => {
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
      await updateEmail(user!, newEmail);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserId(undefined);
        setCartItems([]);
        setWishList([]);
        setUserInfo(undefined);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  const getProducts = async () =>
    await axios
      .get('https://fakestoreapi.com/products?limit=30')
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error));

  useEffect(() => {
    getProducts();
  }, []);

  const addItemToCart = async (product: Product) => {
    if (!userId) {
      return;
    }
    const productAlreadyOnBasket = cartItems.find(item => item.id === product.id);

    const newCartItems = productAlreadyOnBasket
      ? [
          ...cartItems.filter(i => i.id !== product.id),
          { ...productAlreadyOnBasket, amount: productAlreadyOnBasket.amount + 1 },
        ]
      : [...cartItems, { ...product, amount: 1 }];
    // console.log(newCartItems);
    setCartItems(newCartItems);
    updateOrder(newCartItems, userId);
  };

  const wishListHandler = (product: Product) => {
    if (!userId) {
      return;
    }
    console.log(product.id);
    const productAlreadyOnWishList = wishList.find(item => item.id === product.id);
    console.log(productAlreadyOnWishList);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== product.id) : [...wishList, product];

    setWishList(newWishList);
    updateWishList(newWishList, userId);
  };

  const deleteItemToCart = (itemId: number) => {
    if (!userId) {
      return;
    }
    const itemToRemove = cartItems.find(({ id }) => itemId === id);

    const newCartItems =
      itemToRemove!.amount > 1
        ? cartItems.map(item => ({ ...item, amount: item.id === itemId ? item!.amount - 1 : item.amount }))
        : cartItems.filter(item => item.id !== itemId);

    setCartItems(newCartItems);
    updateOrder(newCartItems, userId);
  };

  const deleteAllItemToCart = (id: number) => {
    if (!userId) {
      return;
    }
    setCartItems(cartItems.filter(item => item.id !== id));
    updateOrder(
      cartItems.filter(item => item.id !== id),
      userId
    );
  };

  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider
      value={{
        changePassword,
        changeEmail,
        userInfo,
        wishListHandler,
        wishList,
        deleteAllItemToCart,
        logOut,
        userId,
        products,
        deleteItemToCart,
        cartItems,
        addItemToCart,
        ...{ ...resolvers },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
