/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';
import { Link } from 'react-router-dom';
import OrderSummary from '../molecules/orderSummary';

export const CartPage = () => {
  const { user } = useContext(CartContext);

  return (
    <>
      <OrderSummary />
      <div className="cartProducts__buttonConteiner">
        {user ? (
          <Link to="/checkout-shipping">
            <button className="cartProducts__buttonCheck">Check out</button>
          </Link>
        ) : (
          <p>log in please</p>
        )}
      </div>
    </>
  );
};
