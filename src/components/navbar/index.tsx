import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './style.scss';

const auth = getAuth();

const NavBar = () => (
  <div className="navbar">
    <div>
      {' '}
      <div className="title">
        {' '}
        <p>Shopping App </p>
      </div>{' '}
      {auth.currentUser && (
        <div>
          <button onClick={() => signOut(auth)}> Close sesion </button>
          <Link to="/cart">
            <button> CART </button>
          </Link>{' '}
        </div>
      )}
      {!auth.currentUser && (
        <>
          <div className="button-container">
            <Link to={'/login'}>
              <button className="navbar-button">Login</button>
            </Link>
            <Link to={'/register'}>
              <button className="navbar-button"> register </button>
            </Link>
          </div>
        </>
      )}
    </div>{' '}
  </div>
);

export default NavBar;
