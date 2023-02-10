import classNames from 'classnames';
import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import useClickOutside from '../../../utils/detecClickOutside';
import CartContext from '../../../utils/StateContext';
import MobileProfile from '../../atoms/mobileProfile';
import Welcome from '../../atoms/welcome';
import './style.scss';

type OptionName = 'profile' | 'wishlist' | 'home' | 'basket' | 'search';
type ActiveOption = { current: OptionName; previus: OptionName };
type MobileBarOption = {
  name: OptionName;
  title: string;
  redirect?: string;
  submenu?: JSX.Element;
};

const MobileBar = () => {
  const { user, searchHandler } = useContext(CartContext);
  const { pathname: path } = useLocation();
  const [text, setText] = useState<string>('');
  const containerRef = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const initialOption =
    path === '/'
      ? 'home'
      : path === '/cart'
      ? 'basket'
      : path === '/products'
      ? 'search'
      : ['/login', '/register', '/orders'].includes(path)
      ? 'profile'
      : path.replace(/^\//, '');
  const initialActiveOption = { current: initialOption, previus: 'home' as OptionName } as ActiveOption;
  const [activeOption, setActiveOption] = useState<ActiveOption>(initialActiveOption);
  const [isSubmenuVisible, setSubmenuVisible] = useState(false);
  const navigate = useNavigate();
  useClickOutside({
    ref: containerRef,
    condition: isSubmenuVisible,
    callback: () => closeSubmenu({ current: activeOption.previus, previus: activeOption.current }),
  });

  const onLoginButtonClick = () => {
    navigate('/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmenuVisible(false);
  };

  const onRegisterButtonClick = () => {
    navigate('/register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmenuVisible(false);
  };

  const optionsMap: { [key: string]: MobileBarOption } = {
    home: { name: 'home', title: 'Home', redirect: '/' },
    profile: {
      name: 'profile',
      title: 'Profile',
      submenu: !user ? (
        <Welcome onLogin={onLoginButtonClick} onRegister={onRegisterButtonClick} />
      ) : (
        <MobileProfile closeSubmenu={() => setSubmenuVisible(false)} />
      ),
    },
    search: {
      name: 'search',
      title: 'Search',
      redirect: '/products',
      submenu: (
        <div className="navbar__search">
          <input
            className="navbar__search__input"
            type="text"
            placeholder="Title"
            value={text}
            onChange={e => setText(e.target.value)}
            ref={searchRef}
            onKeyUp={e => {
              if (e.code === 'Enter') {
                searchHandler(text);
              }
            }}
          />
          <div className="navbar__search__button" onClick={() => searchHandler(text)}>
            <img src={getAssetUrl('./header/arrow-right.svg')} alt="search" />
          </div>
        </div>
      ),
    },
    wishlist: {
      name: 'wishlist',
      title: 'Wishlist',
      redirect: '/wishlist',
    },
    basket: { name: 'basket', title: 'Basket', redirect: '/cart' },
  };

  const submenu = optionsMap[activeOption.current]?.submenu;

  const closeSubmenu = (newActiveOption: ActiveOption) => {
    setSubmenuVisible(false);
    setTimeout(() => setActiveOption(newActiveOption), 100);
  };

  const clickHandler = (name: OptionName) => {
    const nextActiveOption = { current: name, previus: activeOption.current };
    const incomingOptionHasSubmenu = optionsMap[name].submenu;

    if (incomingOptionHasSubmenu) {
      if (name === activeOption.current && isSubmenuVisible) {
        closeSubmenu({ current: activeOption.previus, previus: activeOption.current });
        return;
      }
      setActiveOption(nextActiveOption);
      setSubmenuVisible(true);
      // searchRef.current?.focus();
    } else {
      if (isSubmenuVisible) {
        closeSubmenu(nextActiveOption);
      } else {
        setActiveOption(nextActiveOption);
      }
    }
    const redirectPath = optionsMap[name].redirect;
    if (redirectPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(redirectPath);
    }
  };

  return (
    <div ref={containerRef}>
      <div className={classNames('submenu', { 'submenu--visible': isSubmenuVisible })}>{submenu ?? ''}</div>
      <div className="mobilebar">
        <div className="border-selector">
          <div className={`border-active border-active__${activeOption.current}`}></div>
        </div>
        {Object.entries(optionsMap).map(([name, value]) => (
          <div
            className={classNames('mobilebar__option', { 'mobilebar__option--active': activeOption.current === name })}
            onClick={() => clickHandler(name as OptionName)}
            key={name}
          >
            <img
              className={classNames('mobilebar__img', {
                [`mobilebar__img--active mobilebar__img--active__${name}`]: activeOption.current === name,
              })}
              src={getAssetUrl(
                `./header/${name}${activeOption.current === name && name !== 'search' ? '-fill' : ''}.svg`
              )}
              alt={name}
            />
            <span
              className={classNames('mobilebar__title', { 'mobilebar__title--active': activeOption.current === name })}
            >
              {value.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileBar;
