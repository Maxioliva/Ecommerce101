import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

/* Creamos el context, se le puede pasar un valor inicial */
const CartContext = createContext({});

export const CartProvider = () => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
      // eslint-disable-next-line promise/prefer-await-to-then
    }).then(res => {
      // eslint-disable-next-line no-undef
      console.log(res.data);
      setProducts(res.data);
    });

    const getProductsCart = async () =>
      await axios
        .get('http://localhost:4000/products-cart')
        .then(({ data }) => setCartItems(data.productsCart))
        .catch(error => console.error(error));

    useEffect(() => {
      getProducts();
      getProductsCart();
    }, []);

    const addItemToCart = async (product: { name: any; img: any; price: any }) => {
      const { name, img, price } = product;

      await axios.post('http://localhost:4000/products-cart', { name, img, price });

      getProducts();
      getProductsCart();
    };

    const editItemToCart = async (id: number, query: any, amount: number) => {
      if (query === 'del' && amount === 1) {
        await axios.delete(`http://localhost:4000/products-cart/${id}`).then(({ data }) => console.log(data));
      } else {
        await axios
          .put(`http://localhost:4000/products-cart/${id}?query=${query}`, {
            amount,
          })
          .then(({ data }) => console.log(data));
      }

      getProducts();
      getProductsCart();
    };

    return (
      /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
      <CartContext.Provider value={{ cartItems, products, addItemToCart, editItemToCart }}>{}</CartContext.Provider>
    );
  };
};
