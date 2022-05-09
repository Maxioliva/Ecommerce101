import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';

export const ItemCart = ({ item }: any) => {
  const { editItemToCart }: any = useContext(CartContext);

  const { amount } = item;

  return (
    <div className="cartItem">
      <img src="image" alt="title" />
      <div className="dataContainer">
        <div className="left">
          <p>{item.title}</p>
          <div className="buttons">
            <button onClick={() => editItemToCart(item._id, 'add', amount)}>AGREGAR</button>
            <button onClick={() => editItemToCart(item._id, 'del', amount)}>SACAR</button>
          </div>
        </div>
        <div className="right">
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.price}</p>
        </div>
      </div>
    </div>
  );
};
