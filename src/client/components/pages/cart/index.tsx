import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import Button from '../../atoms/button';
import OrderSummary from '../../atoms/orderSummary';
import './style.scss';

export const CartPage = () => {
  const { state, handlers } = useContext(CartContext);

  return (
    <>
      <OrderSummary />
      <div className="cartProducts__buttonConteiner">
        {state.user ? (
          <Link to="/checkout-shipping">
            <Button className="cartProducts__buttonCheck" type="submit">
              {handlers.getString('buttons.checkOut')}
            </Button>
          </Link>
        ) : (
          <p>log in please</p>
        )}
      </div>
    </>
  );
};
