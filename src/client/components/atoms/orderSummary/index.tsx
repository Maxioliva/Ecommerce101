import classNames from 'classnames';
import { useContext } from 'react';
import { getAssetUrl } from '../../../utils/config';
import CartContext from '../../../utils/StateContext';

import './style.scss';

export const OrderSummary = ({ className }: { className?: string }) => {
  const { state, handlers } = useContext(CartContext);
  const { basket } = state;
  const { getString, removeItemFromCart } = handlers;
  const total = basket?.products.reduce((previous, item) => previous + item.price * item.amount, 0);

  return (
    <div className={classNames('orderSummary', className)}>
      <h1 className="orderSummary__h1">{getString('titles.yourOrders')}</h1>
      <div className="orderSummary__list">
        {basket?.products.map(product => (
          <div className="orderSummary__card" key={product.id}>
            <img className="orderSummary__image" src={product.images?.[0]} alt={product.title} />
            <div className="orderSummary__texts">
              <h3 className="orderSummary__texts-title">{product.title}</h3>
              <div className="orderSummary__texts-price">&nbsp;${product.price}&nbsp;</div>
              <h3 className="orderSummary__texts-category">
                {`${getString('details.category')}: ${product.category}`}{' '}
              </h3>
            </div>
            <div className="orderSummary__left">
              <img
                src={getAssetUrl('trash.svg')}
                className="orderSummary__left-button"
                onClick={() => removeItemFromCart(product.id)}
              ></img>
              <h3 className="orderSummary__left-rating">
                {getString('details.rating')}:&nbsp;{product.rating}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <h2 className="orderSummary__total">Total: ${total?.toFixed(2)}</h2>
    </div>
  );
};

export default OrderSummary;
