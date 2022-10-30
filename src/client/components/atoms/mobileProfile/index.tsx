import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../utils/config';
import CartContext from '../../../utils/StateContext';
import './style.scss';

const MobileProfile = ({ closeSubmenu }: { closeSubmenu?: () => void }) => {
  const { logOut, user } = useContext(CartContext);
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await logOut();
    navigate('/');
  };

  const name = capitalizeFirstLetter(user!.firstName) + ' ' + capitalizeFirstLetter(user!.lastName);

  const clickHandler = (url: string) => {
    navigate(url);
    closeSubmenu!();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="profile">
      <h1 className="profile__name">{name}</h1>
      <div className="profile__option" onClick={() => clickHandler('/orders')}>
        My Orders
      </div>
      <div className="profile__option" onClick={() => clickHandler('/orders')}>
        My Addresses
      </div>
      <div className="profile__option" onClick={() => clickHandler('/profile')}>
        Settings
      </div>
      <div className="profile__option" onClick={() => clickHandler('/About')}>
        Help
      </div>
      <button className="profile__button" onClick={logOutHandler}>
        Log Out
      </button>
    </div>
  );
};

export default MobileProfile;
