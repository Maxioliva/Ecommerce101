/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Products from '../components/products';
import * as Resolvers from '../utils/resolvers';
import { Product, ShopState } from '../utils/Type';

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

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
  };

  // const editItemToCart = async () => {
  //   if (query === 'del' && amount === 1) {
  //     await axios.delete(`https://fakestoreapi.com/products/${id}`).then(({ data }) => console.log(data));
  //   } else {
  //     await axios
  //       .put(`https://fakestoreapi.com/products/${id}?query=${query}`, {
  //         amount,
  //       })
  //       .then(({ data }) => console.log(data));
  //   }

  //   getProducts();
  //   getProductsCart();

  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider value={{ products, cartItems, addItemToCart, ...Resolvers }}>{children}</CartContext.Provider>
  );
};

export default CartContext;
