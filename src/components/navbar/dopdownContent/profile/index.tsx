import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../../../context/CartContext';
import './style.scss';

const ProfileDropDown = () => {
  const { logOut, userId } = useContext(CartContext);

  return (
    <div>
      <div className="profile-dropdown__title">{userId ? 'Profile' : 'You are not registered yet'}</div>
      <div>
        <div className="profile-dropdown__box">
          <Link to={'/register'}>Register</Link>
        </div>
        <div className="profile-dropdown__box">
          <Link to={'/login'}>Login</Link>
        </div>
        {userId && (
          <button className="profile-dropdown__button" onClick={() => logOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Close sesion{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
