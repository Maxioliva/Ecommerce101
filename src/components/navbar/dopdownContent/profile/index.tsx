import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../../context/CartContext';
import { getAssetUrl } from '../../../../utils/config';
import './style.scss';

const ProfileDropDown = () => {
  const { userId } = useContext(CartContext);
  const navigate = useNavigate();

  return <div className="profile-dropdown profile-dropdown--login">Profile</div>;
};

export default ProfileDropDown;
