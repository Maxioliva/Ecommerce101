import { faListSquares } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getAuth, signOut, updatePassword, updateEmail } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/spinner';
import firebaseApp from '../firebase/credenciales';
import * as resolvers from '../utils/resolvers';
import { updateOrder, updateWishList } from '../utils/resolvers';
import { Product, ShopState, SimpleOrder, User } from '../utils/Type';

const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<Product[]>([]);
  const [order, setOrder] = useState<SimpleOrder>();
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(firebaseApp);
  const userAuth = auth.currentUser;

  useEffect(() => {
    (async () => {
      if (user) {
        setIsLoading(true);
        getOrder(user.id);
        const currentWishList = await resolvers.getCurrentWishList(user.id);
        setWishList(currentWishList);
        setIsLoading(false);
      }
    })();
  }, [user]);

  const getOrder = async (id: string) => {
    const currentOrder = await resolvers.getCurrentOrder(id);
    setOrder(currentOrder);
    const currentOrderCompleted = await resolvers.getCompletedOrders(id);
  };

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
    // setIsLoading(true);
    getProducts();
    // setIsLoading(false);
  }, []);

  const addItemToCart = async (product: Product) => {
    if (!user) {
      return;
    }
    const productAlreadyOnBasket = order!.products.find(item => item.id === product.id);

    const newCartItems = productAlreadyOnBasket
      ? [
        ...order!.products.filter(i => i.id !== product.id),
        { ...productAlreadyOnBasket, amount: productAlreadyOnBasket.amount + 1 },
      ]
      : [...order!.products, { ...product, amount: 1 }];
    setOrder({ ...order, products: newCartItems });
    updateOrder(newCartItems, user.id);
  };

  const wishListHandler = (product: Product) => {
    if (!user) {
      return;
    }
    const productAlreadyOnWishList = wishList.find(item => item.id === product.id);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== product.id) : [...wishList, product];
    setWishList(newWishList);
    updateWishList(newWishList, user.id);
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
    return < Spinner />
  }


  return (
    <CartContext.Provider
      value={{
        order,
        getOrder,
        changePassword,
        changeEmail,
        wishListHandler,
        wishList,
        deleteAllItemToCart,
        logOut,
        user,
        products,
        deleteItemToCart,
        addItemToCart,
        ...{ ...resolvers, login: (email: string, password: string) => loginHandler(email, password) },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
