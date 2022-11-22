import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import './style.scss';

const ProfileDropDown2 = () => {
  const { user } = useContext(CartContext);

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
    </div>
  );
};

export default ProfileDropDown2;
