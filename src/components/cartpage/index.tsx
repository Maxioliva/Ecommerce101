/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const { deleteItemToCart, cartItems, userId } = useContext(CartContext);
  const total = cartItems?.reduce((previous, item) => previous + item.price * item.amount, 0);

  console.log(cartItems);
  return (
    <>
      <div className="cartProducts">
        <div className="cartProducts__list"></div>
        {cartItems.map(product => (
          <>
            <div className="cartProducts__card" key={product.id}>
              <img className="cartProducts__image" src={product.image} alt={product.title} />
              <h3 className="cartProducts__title">{product.title}</h3>
              <h3 className="cartProducts__rating">Rate:&nbsp;{product.rating.rate}</h3>
              <h3 className="cartProducts__category">{`Category: ${product.category}`} </h3>
              <div className="cartProducts__price">&nbsp;${product.price}&nbsp;</div>

              <div>
                <button className="cartProducts__button" onClick={() => deleteItemToCart(product.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          </>
        ))}; 
          <h2 className="cartProducts__total">Total: ${total.toFixed(2)}</h2>
      </div>
      <div className='cartProducts__buttonConteiner'>
            {userId ? 
            <Link to="/checkout">
            <button className='cartProducts__buttonCheck'>Check out</button></Link>
             : <p>log in please</p>}
          </div>
    </>
  );
};
