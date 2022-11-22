<<<<<<< HEAD
import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';
import { Link } from 'react-router-dom';
import OrderSummary from '../../atoms/orderSummary';
import Button from '../../atoms/button';

export const CartPage = () => {
  const { user } = useContext(CartContext);

  return (
    <>
      <OrderSummary />
      <div className="cartProducts__buttonConteiner">
        {user ? (
          <Link to="/checkout-shipping">
            <Button className="cartProducts__buttonCheck" type="submit">
              Check Out
            </Button>
          </Link>
        ) : (
          <p>log in please</p>
        )}
      </div>
    </>
  );
};
=======
import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';
import { Link } from 'react-router-dom';
import OrderSummary from '../../atoms/orderSummary';
import Button from '../../atoms/button';

export const CartPage = () => {
  const { user } = useContext(CartContext);

  return (
    <>
      <OrderSummary />
      <div className="cartProducts__buttonConteiner">
        {user ? (
          <Link to="/checkout-shipping">
            <Button className="cartProducts__buttonCheck" type="submit">
              Check Out
            </Button>
          </Link>
        ) : (
          <p>log in please</p>
        )}
      </div>
    </>
  );
};
>>>>>>> 5619e7bf89789146389df5d8377b7bc84d262d32
