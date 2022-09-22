import { useContext } from 'react';
import CartContext from '../../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export const OrderSummary = () => {
  const { deleteItemToCart, cartItems, user } = useContext(CartContext);
  const total = cartItems?.reduce((previous, item) => previous + item.price * item.amount, 0);

  console.log(cartItems);
  return (
    <div className="cartProducts">
      <h1 className='cartProducts__h1'>Your Basket</h1>
      <div className="cartProducts__list">
        {cartItems.map(product => (
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
        ))}
      </div>
      <h2 className="cartProducts__total">Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default OrderSummary;