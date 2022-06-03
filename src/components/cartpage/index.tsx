/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems?.reduce((previous, current) => previous + current.price, 0);

  console.log(cartItems);
  return (
    <>
      <div className="cartProduct">
        <div className="cartProducts__list"></div>
        {cartItems.map(product => (
          <div className="cartProducts__card" key={product.id}>
            <img className="cartProducts__image" src={product.image} alt={product.title} />
            <h3 className="cartProducts__title">{product.title}</h3>
            <h3 className="cartProducts__rating">Rate:&nbsp;{product.rating.rate}</h3>
            <h3 className="cartProducts__category">{`Category: ${product.category}`} </h3>
            <div className="cartProducts__price">&nbsp;${product.price}&nbsp;</div>
          </div>
        ))}
        ;
      </div>
      <div>
        {' '}
        <h2 className="cartProducts__total">Total Products: ${total.toFixed(2)}</h2>
      </div>
    </>
  );
};
