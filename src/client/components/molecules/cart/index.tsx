import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import ItemList from '../../atoms/itemList';

import './style.scss';

const CartDropDown = () => {
  const { user, order } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      <div className="profile-dropdown__title">You Cart</div>
      <div className="separatorLine"></div>
      <div className="profile-dropdown__title">
        {order?.products.length ? (
          <div className="productsContainer">
            {order.products.map((item, i) => (
              <ItemList key={i} item={item} />
            ))}
          </div>
        ) : (
          <div>Your Cart is empty!</div>
        )}
      </div>
      <div className="buttonsBhindConteiner">
        {user ? (
          <Link to="checkout-shipping">
            <button className="buttonsBhind">Check out</button>
          </Link>
        ) : (
          <p>log in please</p>
        )}
      </div>
      <div className="buttonsBhindConteiner">
        <Link to="cart">
          <button className="buttonsBhind" onClick={() => setCartOpen(!cartOpen)}>
            Basket Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropDown;
