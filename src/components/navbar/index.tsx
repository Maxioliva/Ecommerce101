import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/config';
import './style.scss';
// import { getAuth, signOut } from 'firebase/auth';

// const auth = getAuth();
const NavBar = () => (
  <div className="navbar">
    <div className="navbar__option">
      <img src={getAssetUrl('./basket.svg')} alt="basket" />
    </div>
    <div className="navbar__option">
      <img src={getAssetUrl('./profile.svg')} alt="profile" />
    </div>

    {/* {!auth.currentUser && <button onClick={() => signOut(auth)}> Close sesion </button>} */}
    <Link to={'/login'}>
      <div className="navbar__link">Login</div>
    </Link>
    <Link to={'/register'}>
      <div className="navbar__link">register</div>
    </Link>
    <Link to="/cart">
      <div className="navbar__link">cart</div>
    </Link>
    <Link to="/products">
      <div className="navbar__link">products</div>
    </Link>
  </div>
);
export default NavBar;
