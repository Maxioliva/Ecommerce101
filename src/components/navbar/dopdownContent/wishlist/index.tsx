/* eslint-disable react/no-unescaped-entities */
import { faHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../../../context/CartContext';
import { getAssetUrl } from '../../../../utils/config';
import './style.scss';

const WishListDropDown = () => {
  const { userId, wishList } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="profile-dropdown__title">{userId ? 'Wishlist' : 'You are not registered yet'}</div>
      <div className="profile-dropdown__title">
        {userId && !wishList.length && (
          <>
            <div>Your wishlist is empty!</div>
            <div className="separatorLine"></div>
            <div>
              Select to <FontAwesomeIcon icon={faHeart} /> add something to your Wishlist <></>
            </div>
          </>
        )}
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
