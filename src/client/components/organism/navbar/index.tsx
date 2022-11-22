import { useLocation, useNavigate } from 'react-router-dom';
import useIsMobile from '../../../utils/useIsMobile';
import DropDown from '../../atoms/dropdown';
import Icon from '../../atoms/icono';
import Logo from '../../atoms/logo';
import CartDropDown from '../../molecules/cart';
import WishListDropDown from '../../molecules/wishlist';
import ProfileDropDown from '../../pages/profile';
import './style.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  if (['/login', '/register'].includes(pathname)) {
    return <> </>;
  }
  return (
    <div className="navbar">
      <div className="navbar__logo__2">
        <Logo />
      </div>
      {!isMobile && (
        <>
          <div className="navbar__option">
            <DropDown control="profile" content={<ProfileDropDown />} />{' '}
          </div>
          <div className="navbar__option">
            <DropDown control="wishlist" content={<WishListDropDown />} />{' '}
          </div>
          <div className="navbar__option">
            <DropDown control="basket" content={<CartDropDown />} />{' '}
          </div>
          <div className="navbar__option__1">
            <Icon size={30} icon={'products'} onClick={() => navigate('/Products')} />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
