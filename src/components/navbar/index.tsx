/* eslint-disable quotes */
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/config';
import './style.scss';
import Cart from '../cart';
import CartContext from '../../context/CartContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const { logOut, userId } = useContext(CartContext);
  return (
    <div className="navbar">
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
    </div>
  );
};
export default NavBar;
