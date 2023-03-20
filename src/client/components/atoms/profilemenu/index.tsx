import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import './style.scss';

const ProfileDropDown2 = () => {
  const { state, handlers } = useContext(CartContext);
  const { user } = state;
  const { getString } = handlers;

  return (
    <div>
      <div className="profile-dropdown2__title">{user ? 'Profile' : 'You are not registered yet'}</div>
      <div className="profile-dropdown2__box">
        {user ? (
          <NavLink to={'/profile'} className="Nav_link">
            {getString('links.settings')}
          </NavLink>
        ) : (
          <NavLink to={'/register'} className="Nav_link">
            {getString('links.register')}
          </NavLink>
        )}
      </div>
      <div className="profile-dropdown2__box">
        {user ? (
          <div>
            <NavLink to={'/orders'} className="Nav_link">
              {getString('links.orders')}
            </NavLink>
          </div>
        ) : (
          <NavLink to={'/login'} className="Nav_link">
            {getString('links.login')}
          </NavLink>
        )}
      </div>
      {user && <div className="profile-dropdown2__box">{getString('links.help')}</div>}
    </div>
  );
};

export default ProfileDropDown2;
