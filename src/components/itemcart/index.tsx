import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';

export const ItemCart = ({ item }: any) => {
  const { deleteItemToCart }: any = useContext(CartContext);

  return (
    <div className="cartItem">
      <img className="product-cart" src={item.image} />
      <div className="dataContainer">
        <div className="left">
          <p>{item.title}</p>
          <div className="buttons">
            <button onClick={() => deleteItemToCart(item.id)}>Delete</button>
          </div>
        </div>
        <div className="right">
          <div>${item.price}</div>
        </div>
        <div> </div>
      </div>
    </div>
  );
};
