/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/config';
import './style.scss';
import Cart from '../cart';
import CartContext from '../../context/CartContext';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const NavBar = () => {
  const { logOut, userId } = useContext(CartContext);
  const [hover, setHover] = useState(false);

  return (
    <div className="navbar">
      <img src={getAssetUrl('./login/ecommercelogo.png')} className="navbar__logo" />
      <Cart />
      <div className="navbar__option">
        <img src={getAssetUrl('./basket.svg')} alt="basket" />
      </div>
      <div className="navbar__option">
        <img src={getAssetUrl('./profile.svg')} alt="profile" />
      </div>
      {userId && (
        <button className="navbar__button" onClick={() => logOut()}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Close sesion{' '}
        </button>
      )}
      <Link to={'/login'}>
        <div className="navbar__link">Login</div>
      </Link>
      <Link to={'/register'}>
        <div className="navbar__link">register</div>
      </Link>
      <Link to="/products">
        <div className="navbar__link">products</div>
      </Link>
      <Link to="/wishlist">
        <div className="navbar__wish" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {hover && <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>}
          {!hover && <FontAwesomeIcon icon={faHeartRegular}></FontAwesomeIcon>}
        </div>
      </Link>
    </div>
  );
};
export default NavBar;
