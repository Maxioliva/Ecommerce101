import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';

import './style.scss';

export const OrderSummary = () => {
  const { deleteItemToCart, order } = useContext(CartContext);
  const total = order?.products.reduce((previous, item) => previous + item.price * item.amount, 0);

  return (
    <div className="orderSummary">
      <h1 className="orderSummary__h1">Your Basket</h1>
      <div className="orderSummary__list">
        {order?.products.map(product => (
          <div className="orderSummary__card" key={product.id}>
            <img className="orderSummary__image" src={product.image} alt={product.title} />
            <h3 className="orderSummary__title">{product.title}</h3>
            <h3 className="orderSummary__rating">Rate:&nbsp;{product.rating.rate}</h3>
            <h3 className="orderSummary__category">{`Category: ${product.category}`} </h3>
            <div className="orderSummary__price">&nbsp;${product.price}&nbsp;</div>
            <div>
              <button className="orderSummary__button" onClick={() => deleteItemToCart(product.id)}></button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="orderSummary__total">Total: ${total?.toFixed(2)}</h2>
    </div>
  );
};

export default OrderSummary;
