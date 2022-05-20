/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import axios from 'axios';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import firebaseApp from '../firebase/credenciales';
import * as resolvers from '../utils/resolvers';
import { Product, ShopState } from '../utils/Type';

const CartContext = createContext<ShopState>({} as ShopState);

const auth = getAuth(firebaseApp);

export const CartProvider = ({ children }: any) => {
  const [user, setUSer] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  onAuthStateChanged(auth, userFirebase => {
    setUSer(userFirebase);
    console.log(userFirebase);
  });
  // console.log(user);

  const getProducts = async () =>
    await axios
      .get('https://fakestoreapi.com/products')
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error));

  useEffect(() => {
    getProducts();
  }, []);

  const addItemToCart = async (product: Product) => {
    setCartItems([...cartItems, product]);
    resolvers.createOrder(cartItems);
  };

  const deleteItemToCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider value={{ user, products, deleteItemToCart, cartItems, addItemToCart, ...resolvers }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
