import { useContext } from 'react';
import ProfileDropDown from '..';
import CartContext from '../../../../../context/CartContext';
import './style.scss';

const ProfileSettings = () => {
  const { userInfo } = useContext(CartContext);

  return (
    <>
      <div>{userInfo?.email}</div>
      <div>{userInfo?.firstName}</div>
      <div>{userInfo?.lastName}</div>
      <div>{userInfo?.gender}</div>
      <div className="profile-settings">
        <ProfileDropDown />
      </div>
    </>
  );
};
export default ProfileSettings;
