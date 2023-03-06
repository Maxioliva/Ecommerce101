import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import './style.scss';

const ProfileDropDown = () => {
  const { state, handlers } = useContext(CartContext);
  const { logOut, getString } = handlers;
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await logOut();
    navigate('/products');
  };

  return (
    <div>
      <div className="profile-dropdown__title">{state.user ? 'Profile' : 'You are not registered yet'}</div>
      <div className="profile-dropdown__box">
        {state.user ? (
          <NavLink to={'/profile'} className="Nav_link">
            {getString('links.settings')}
          </NavLink>
        ) : (
          <NavLink to={'/register'} className="Nav_link">
            {getString('links.register')}
          </NavLink>
        )}
      </div>
      <div className="profile-dropdown__box">
        {state.user ? (
          <div className="profile-dropdown__box">
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

      {state.user && <div className="profile-dropdown__box">{getString('links.help')}</div>}
      {state.user && (
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
