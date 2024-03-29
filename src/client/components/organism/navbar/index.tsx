import { ChangeEventHandler, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import CartContext from '../../../utils/StateContext';
import useIsMobile from '../../../utils/useIsMobile';
import DropDown from '../../atoms/dropdown';
import Icon from '../../atoms/icono';
import Logo from '../../atoms/logo';
import CartDropDown from '../../molecules/cart';
import Categories from '../../molecules/categories';
import WishListDropDown from '../../molecules/wishlist';
import ProfileDropDown from '../../pages/profile';
import './style.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  // const { changeLanguage, searchHandler, getString } = useContext(CartContext);
  const [text, setText] = useState<string>('');

  const handlerNewtext: ChangeEventHandler<HTMLInputElement> = e => {
    const newText = e.target.value;
    setText(newText);
  };

  // const submitHandler = async () => {
  //   await searchHandler(text);
  // };

  if (['/login', '/register'].includes(pathname)) {
    return <> </>;
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar__logo">
          <Logo />
          <div className="navbar__languages">
            {/* <div className="navbar__language">
              <span className="navbar__span">{getString('languages.spanish')}</span>
              <Icon size={40} icon={'es'} onClick={() => changeLanguage('es')} deactivateHover />
            </div>
            <div className="navbar__language">
              <Icon size={40} icon={'us'} onClick={() => changeLanguage('en')} deactivateHover />
              <span className="navbar__span">{getString('languages.english')}</span>
            </div> */}
          </div>
        </div>

        {!isMobile && (
          <>
            {/* <div className="navbar__search">
              <input
                className="navbar__search__input"
                type="text"
                placeholder="Title"
                value={text}
                onChange={handlerNewtext}
                onKeyUp={e => {
                  if (e.code === 'Enter') {
                    searchHandler(text);
                  }
                }}
              />
              <div className="navbar__search__button" onClick={submitHandler}>
                <span>{getString('generic.search')}</span>
                <img src={getAssetUrl('./header/search.svg')} alt="search" />
              </div>
            </div> */}
            <div className="navbar__option">
              <div className="navbar__option__drop">
                <DropDown control="profile" content={<ProfileDropDown />} />{' '}
              </div>
              <div className="navbar__option__drop">
                <DropDown control="wishlist" content={<WishListDropDown />} />{' '}
              </div>
              <div className="navbar__option__drop">
                <DropDown control="basket" content={<CartDropDown />} />{' '}
              </div>
              <div className="navbar__option__icon">
                <Icon size={30} icon={'products'} onClick={() => navigate('/Products')} />
              </div>
            </div>
          </>
        )}
      </div>
      {!isMobile && <Categories className="navbar__categories" />}
    </div>
  );
};

export default NavBar;
