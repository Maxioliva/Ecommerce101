import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import './style.scss';

const ProfileDropDown = () => {
  const { state, handlers } = useContext(CartContext);
  const { user } = state;
  const { logOut, getString } = handlers;
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await logOut();
    navigate('/products');
  };

  return (
    <div>
      <div className="profile-dropdown__title">{user ? 'Profile' : 'You are not registered yet'}</div>
      <div className="profile-dropdown__box">
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
      <div>
        {user ? (
          <>
            <div className="profile-dropdown__box">
              <NavLink to={'/orders'} className="Nav_link">
                {getString('links.orders')}
              </NavLink>
            </div>
            <div className="profile-dropdown__box">
              <NavLink to={'/sellers'} className="Nav_link">
                Sellers
              </NavLink>
            </div>
          </>
        ) : (
          <NavLink to={'/login'} className="Nav_link">
            {getString('links.login')}
          </NavLink>
        )}
      </div>

      {user && <div className="profile-dropdown__box">{getString('links.help')}</div>}
      {user && (
        <>
          <button className="profile-dropdown__button" onClick={logOutHandler}>
            {getString('buttons.closeSesion')}{' '}
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileDropDown;
