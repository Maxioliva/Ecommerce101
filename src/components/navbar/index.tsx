/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import { Link, useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../utils/config';
import DropDown from '../atoms/dropdown';
import ProfileDropDown from './dopdownContent/profile';
import './style.scss';

import Cart from '../cart';
import CartContext from '../../context/CartContext';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Icon from '../atoms/icono';
import WishList from '../wishlist';
import WishListDropDown from './dopdownContent/wishlist';
import CartDropDown from './dopdownContent/cart';

const NavBar = () => {
  const { logOut, userId } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={getAssetUrl('./login/ecommercelogo.png')} className="navbar__logo" />

      {/* <Cart /> */}

      <div className="navbar__option">
        <div className="navbar__1">
          <DropDown control="profile" content={<ProfileDropDown />} />{' '}
        </div>
        <div className="navbar__2">
          <DropDown control="wishlist" content={<WishListDropDown />} />{' '}
        </div>
        <div className="navbar__0">
          <DropDown control="cart" content={<CartDropDown />} />{' '}
        </div>
        <div className="navbar__3">
          <Icon size={30} icon={'products'} onClick={() => navigate('/Products')} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
