/* eslint-disable react/no-unescaped-entities */
import { faHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../../context/CartContext';
import { ItemList } from '../../../itemList';

import './style.scss';

const WishListDropDown = () => {
  const { userId, wishList} = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="profile-dropdown__title">{userId ? 'Wishlist' : 'You are not registered yet'}</div>
      <div className="separatorLine"></div>
      <div className="profile-dropdown__title">
         { (userId && wishList.length) ? (
          <div className="productsContainer">
          {wishList.map((item, i) => (
        <ItemList key={i} item={item} />))}
        </div>
           ) : (<div>Your wishlist is empty!</div>)
            }
      </div>
      <div>
        {userId && (
          <button className="profile-dropdown__button" onClick={() => navigate('/wishlist')}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Go To Favorites{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default WishListDropDown;
