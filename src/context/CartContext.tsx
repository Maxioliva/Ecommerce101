/* eslint-disable consistent-return */
/* eslint-disable react/jsx-key */
import axios from 'axios';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import * as resolvers from '../utils/resolvers';
import { updateOrder } from '../utils/resolvers';
import { Product, ShopState } from '../utils/Type';

const CartContext = createContext<ShopState>({} as ShopState);

const auth = getAuth(firebaseApp);

export const CartProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<string>();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  onAuthStateChanged(auth, userFirebase => {
    (async () => {
      console.log(userFirebase);

      if (userFirebase && userId !== userFirebase?.uid) {
        setUserId(userFirebase?.uid);
        const currentBasket = await resolvers.getCurrentBasket(userFirebase?.uid);
        setCartItems(currentBasket);
      }
    })();
  });
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserId(undefined);
        setCartItems([]);
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
    console.log(newCartItems);
    setCartItems(newCartItems);
    updateOrder(newCartItems, userId);
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
        deleteAllItemToCart,
        logOut,
        userId,
        products,
        deleteItemToCart,
        cartItems,
        addItemToCart,
        ...resolvers,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
