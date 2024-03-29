import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import Button from '../../atoms/button';
import Icon from '../../atoms/icono';
import './style.scss';

const WishList = () => {
  const { state, handlers } = useContext(CartContext);
  const { getString, addItemToCart, wishListHandler } = handlers;

  return (
    <div className="wishList">
      <span className="wishList__head">{getString('titles.myWishlist')}</span>
      {state.wishList.map(product => (
        <div className="wishList__card" key={product.id}>
          <div className="wishList__left">
            <img className="wishList__image" src={product.images[0]} alt={product.title} />
            <div className="wishList__texts">
              <h3 className="wishList__texts-title">{product.title}</h3>
              <div className="wishList__texts-price">&nbsp;${product.price}&nbsp;</div>
              {/* <h3 className="wishList__texts-category">{`${getString('details.category')}: ${product.category}`} </h3> */}
            </div>
          </div>
          <div className="wishList__buttons">
            <Icon value={true} size={25} icon="wishlist" onClick={() => wishListHandler(product.id)} />
            <Button
              className="wishList__buttons-button"
              onClick={() => {
                addItemToCart(product.id);
                wishListHandler(product.id);
              }}
            >
              {getString('buttons.addToCart')}{' '}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
