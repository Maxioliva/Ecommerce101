import './style.scss';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../firebase/credenciales';

// const auth = getAuth(firebaseApp);

const NavBar = () => (
  <>
    <div className="navbar">
      {/* {' '}
     <div> Home
      {auth.currentUser && <button onClick={() => signOut(auth)}> Close sesion </button>}
      {!auth.currentUser && (
        <> */}
      <div className="button-container">
        <Link to={'/login'}>
          <button className="navbar-button">Login</button>
        </Link>
        <Link to={'/register'}>
          <button className="navbar-button"> register </button>
        </Link>
        <Link to="/cart">
          <button> CART </button>
        </Link>
      </div>
      {/* </> */}
      <div className="title">
        {' '}
        <p>Shopping App </p>
      </div>
      ;
    </div>
  </>
);
export default NavBar;
