import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';

export const ItemList = ({ item }: any) => {
  const { addItemToCart, deleteItemToCart, deleteAllItemToCart }: any = useContext(CartContext);

  return (
    <div className="cartItem">
      <img className="product-cart" src={item.image} />
      <div className="dataContainer">
        <div className="left">
          <div className="item-title">
            <p>{item.title}</p>
          </div>
        </div>
        <div className="right">
          <div>${item.price}</div>
        </div>
        </div>
    </div>
  );
};
