import { useLocation, useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../utils/config';
import DropDown from '../atoms/dropdown';
import ProfileDropDown from './dopdownContent/profile';
import './style.scss';
import Icon from '../atoms/icono';
import WishListDropDown from './dopdownContent/wishlist';
import CartDropDown from './dopdownContent/cart';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (['/login', '/register'].includes(pathname)) {
    return <> </>;
  }
  return (
    <div className="navbar">
      <div className="navbar__option__3">
        <img className="navbar__logo" src={getAssetUrl('./header/navbarlogo.png')} alt="section1" />
      </div>
      <div className="navbar__option">
        <DropDown control="profile" content={<ProfileDropDown />} />{' '}
      </div>
      <div className="navbar__option">
        <DropDown control="wishlist" content={<WishListDropDown />} />{' '}
      </div>
      <div className="navbar__option">
        <DropDown control="cart" content={<CartDropDown />} />{' '}
      </div>
      <div className="navbar__option__1">
        <Icon size={30} icon={'products'} onClick={() => navigate('/Products')} />
      </div>
    </div>
  );
};

export default NavBar;
