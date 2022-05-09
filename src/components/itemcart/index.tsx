/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line quotes
import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
// import styles from './styles.module.scss';

export const ItemCart = ({ item }: any) => {
  /* Traemos del context las funciones para agregar y sacar productos del carrito */
  const { editItemToCart }: any = useContext(CartContext);

  /* Desestructuramos el item para sacar solo la id */
  const { amount } = item;

  return (
    <div className="cartItem">
      <img src="image" alt="title" />
      <div className="dataContainer">
        <div className="left">
          <p>{item.title}</p>
          {/* <div className={styles.buttons}>
            <button onClick={() => editItemToCart(item._id, "add", amount)}>
              AGREGAR
            </button>
            <button onClick={() => editItemToCart(item._id, "del", amount)}>
              SACAR
            </button>
          </div> */}
        </div>
        <div className="right">
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.price}</p>
        </div>
      </div>
    </div>
  );
};
