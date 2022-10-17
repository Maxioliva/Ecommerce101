import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';
import { Link } from 'react-router-dom';
import OrderSummary from '../../atoms/orderSummary';

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
