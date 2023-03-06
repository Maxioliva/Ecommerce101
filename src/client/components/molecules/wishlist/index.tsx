import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import ItemList from '../../atoms/itemList';
import './style.scss';

const WishListDropDown = () => {
  const { state, handlers } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="profile-dropdown__title">Wishlist</div>
      <div className="separatorLine"></div>
      <div className="profile-dropdown__title">
        {state.wishList.length ? (
          <div className="productsContainer">
            {state.wishList.map((item, i) => (
              <ItemList key={i} item={item} />
            ))}
          </div>
        ) : (
          <div>Your wishlist is empty!</div>
        )}
      </div>
      <div>
        <button className="profile-dropdown__button" onClick={() => navigate('/wishlist')}>
          {handlers.getString('buttons.favorites')}{' '}
        </button>
      </div>
    </div>
  );
};

export default WishListDropDown;
