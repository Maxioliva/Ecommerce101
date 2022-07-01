import { useContext } from 'react';
import CartContext from '../../context/CartContext';

const WishList = () => {
  const { wishList } = useContext(CartContext);
  return (
    <div className="cartProduct">
      <div className="cartProducts__list"></div>
      {wishList.map(product => (
        <div className="cartProducts__card" key={product.id}>
          <img className="cartProducts__image" src={product.image} alt={product.title} />
          <h3 className="cartProducts__title">{product.title}</h3>
          <h3 className="cartProducts__category">{`Category: ${product.category}`} </h3>
          <div className="cartProducts__price">&nbsp;${product.price}&nbsp;</div>
        </div>
      ))}
      ;
    </div>
  );
};

export default WishList;
