import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import * as resolvers from '../utils/resolvers';
import { Product, ShopState } from '../utils/Type';

const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
    <CartContext.Provider value={{ products, cartItems, addItemToCart, ...resolvers }}>{children}</CartContext.Provider>
  );
};

export default CartContext;
