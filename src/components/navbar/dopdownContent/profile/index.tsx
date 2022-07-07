import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../../../context/CartContext';
import { getAssetUrl } from '../../../../utils/config';
import './style.scss';

const ProfileDropDown = () => {
  const { logOut, userId } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className='"profile-dropdown__info'>
      <div className="profile-dropdown profile-dropdown--login">Profile</div>;
      <div>
        <Link to={'/register'}>
          <div>register</div>
        </Link>
        <Link to={'/login'}>
          <div>login</div>
        </Link>
        {userId && (
          <button className="navbar__button" onClick={() => logOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Close sesion{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
