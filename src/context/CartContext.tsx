import axios from 'axios';
import { getAuth, signOut, updatePassword, updateEmail } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import * as resolvers from '../utils/resolvers';
import { updateOrder, updateWishList } from '../utils/resolvers';
import { Product, ShopState, User } from '../utils/Type';

const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<Product[]>([]);
  const auth = getAuth(firebaseApp);
  const userAuth = auth.currentUser;

  useEffect(() => {
    (async () => {
      if (user) {
        const currentBasket = await resolvers.getCurrentBasket(user.id);
        setCartItems(currentBasket);
        const currentWishList = await resolvers.getCurrentWishList(user.id);
        setWishList(currentWishList);
      }
    })();
  }, [user]);

  const loginHandler = async (email: string, password: string) => {
    const userInstance = await resolvers.login(email, password);
    setUser(userInstance);
    return userInstance;
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
        // Sign-out successful.

        setCartItems([]);
        setWishList([]);
        setUser(undefined);
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
    if (!user) {
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
    updateOrder(newCartItems, user.id);
  };

  const wishListHandler = (product: Product) => {
    if (!user) {
      return;
    }
    console.log(product.id);
    const productAlreadyOnWishList = wishList.find(item => item.id === product.id);
    console.log(productAlreadyOnWishList);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== product.id) : [...wishList, product];

    setWishList(newWishList);
    updateWishList(newWishList, user.id);
  };

  const deleteItemToCart = (itemId: string) => {
    if (!user) {
      return;
    }
    const itemToRemove = cartItems.find(({ id }) => itemId === id);

    const newCartItems =
      itemToRemove!.amount > 1
        ? cartItems.map(item => ({ ...item, amount: item.id === itemId ? item!.amount - 1 : item.amount }))
        : cartItems.filter(item => item.id !== itemId);

    setCartItems(newCartItems);
    updateOrder(newCartItems, user.id);
  };

  const deleteAllItemToCart = (id: string) => {
    if (!user) {
      return;
    }
    setCartItems(cartItems.filter(item => item.id !== id));
    updateOrder(
      cartItems.filter(item => item.id !== id),
      user.id
    );
  };

  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider
      value={{
        changePassword,
        changeEmail,
        wishListHandler,
        wishList,
        deleteAllItemToCart,
        logOut,
        user,
        products,
        deleteItemToCart,
        cartItems,
        addItemToCart,
        ...{ ...resolvers, login: (email: string, password: string) => loginHandler(email, password) },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
