import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';

export const ItemCart = ({ item }: any) => {
  const { addItemToCart, deleteItemToCart }: any = useContext(CartContext);

  return (
    <div className="cartItem">
      <img className="product-cart" src={item.image} />
      <div className="dataContainer">
        <div className="left">
          <div className="item-title">
            <p>{item.title}</p>
          </div>

          <div className="quantity-container">
            <button onClick={() => addItemToCart(item)}>+</button>
            <input type="text" value={item.amount} className="quantity-input"></input>
            <button id="decrease">-</button>
          </div>
        </div>
        <div className="right">
          <div>${item.price}</div>
        </div>
        <div className="buttons">
          <button onClick={() => deleteItemToCart(item.id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <div className="quantity-title">Quantity:{item.amount}</div>
    </div>
  );
};
