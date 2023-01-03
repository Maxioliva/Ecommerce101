import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';

export const ItemCart = ({ item }: any) => {
  const { addItemToCart, deleteItemToCart, deleteAllItemToCart }: any = useContext(CartContext);

  return (
    <div className="itemCart">
      <img className="itemCart__product-cart" src={item.image} />
      <div className="itemCart__dataContainer">
        <div className="itemCart__left">
          <div className="itemCart__item-title">
            <p>{item.title}</p>
          </div>

          <div className="itemCart__quantity-container">
            <button onClick={() => addItemToCart(item)}>+</button>
            <input type="text" value={item.amount} className="itemCart__quantity-input"></input>
            <button onClick={() => deleteItemToCart(item.id)}>-</button>
          </div>
        </div>
        <div className="itemCart__right">
          <div>${item.price}</div>
        </div>
        <div className="buttons">
          <button onClick={() => deleteAllItemToCart(item.id)}></button>
        </div>
      </div>
      <div className="itemCart__quantity-title">Stock {item.amount}</div>
    </div>
  );
};
