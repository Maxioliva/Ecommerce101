import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/config';
import DropDown from '../atoms/dropdown';
import ProfileDropDown from './dopdownContent/profile';
import './style.scss';

const NavBar = () => (
  <div className="navbar">
    {/* <Cart /> */}
    <div className="navbar__option">
      <img src={getAssetUrl('./header/cart.svg')} alt="basket" />
    </div>
    <div className="navbar__option "></div>
    <DropDown control="profile" content={<ProfileDropDown />} />
    {/* {!auth.currentUser && <button onClick={() => signOut(auth)}> Close sesion </button>} */}
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

export default NavBar;
