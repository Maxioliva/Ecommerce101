/* eslint-disable react/no-unescaped-entities */
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '../../../../../context/CartContext';
import './style.scss';

const ProfileDropDown2 = () => {
  const { logOut, user } = useContext(CartContext);

  return (
    <div>
      <div className="profile-dropdown2__title">{user ? 'Profile' : 'You are not registered yet'}</div>

      <div className="profile-dropdown2__box">
        {user ? (
          <NavLink to={'/profile'} className="Nav_link">
            Profile & Security
          </NavLink>
        ) : (
          <NavLink to={'/register'} className="Nav_link">
            Register
          </NavLink>
        )}
      </div>
      <div className="profile-dropdown2__box">
        {user ? (
          <div>
            <NavLink to={'/orders'} className="Nav_link">
              Orders
            </NavLink>
          </div>
        ) : (
          <NavLink to={'/login'} className="Nav_link">
            Login
          </NavLink>
        )}
      </div>

      {user && <div className="profile-dropdown2__box">Help</div>}
      {user && (
        <>
          <button className="profile-dropdown2__button" onClick={() => logOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Close sesion{' '}
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileDropDown2;
