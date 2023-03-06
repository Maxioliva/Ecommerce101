import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import ItemList from '../../atoms/itemList';

import './style.scss';

const CartDropDown = () => {
  const { state, handlers } = useContext(CartContext);
  const { user, basket } = state;
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="cartDropDown">
      <div className="cartDropDown__title">You Cart</div>
      <div className="cartDropDown__title">
        {basket?.products?.length ? (
          <div className="cartDropDown__productsContainer">
            {basket.products.map((item, i) => (
              <ItemList key={i} item={item} />
            ))}
          </div>
        ) : (
          <div>Your Cart is empty!</div>
        )}
      </div>
      <div className="cartDropDown__buttonsBhindConteiner">
        {user ? (
          <Link to="checkout-shipping">
            <button className="cartDropDown__buttonsBhind">{handlers.getString('buttons.checkOut')}</button>
          </Link>
        ) : (
          <p>log in please</p>
        )}
      </div>
      <div className="cartDropDown__buttonsBhindConteiner">
        <Link to="cart">
          <button className="cartDropDown__buttonsBhind" onClick={() => setCartOpen(!cartOpen)}>
            {handlers.getString('buttons.basketPage')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropDown;
