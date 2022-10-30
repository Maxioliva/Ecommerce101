import classNames from 'classnames';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import './style.scss';

type MobileBarOption = {
  name: 'profile' | 'wishlist' | 'home' | 'basket' | 'search';
  title: string;
  redirect?: () => void;
};

const MobileBar = () => {
  const { pathname } = useLocation();
  const initialOption = pathname === '/' ? 'home' : pathname === '/products' ? 'search' : pathname.replace(/^\//, '');
  const navigate = useNavigate();

  const [activeOption, setActiveOption] = useState<MobileBarOption['name']>(initialOption as MobileBarOption['name']);

  const optionsMap: { [key: string]: { title: string; redirect?: string } } = {
    home: { title: 'Home', redirect: '/' },
    profile: { title: 'Profile' },
    search: { title: 'Products', redirect: '/products' },
    wishlist: { title: 'Wishlist', redirect: '/wishlist' },
    basket: { title: 'Basket', redirect: '/basket' },
  };

  const clickHandler = (name: MobileBarOption['name']) => {
    setActiveOption(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const redirectPath = optionsMap[name].redirect;
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <>
      <div className="mobilebar"></div>
      <div className="mobilebar">
        {Object.entries(optionsMap).map(([name, value]) => (
          <div
            className={classNames('mobilebar__option', {
              [`mobilebar__option--active mobilebar__option--active__${name}`]: activeOption === name,
            })}
            onClick={() => clickHandler(name as MobileBarOption['name'])}
            key={name}
          >
            <img
              className={classNames('mobilebar__img', {
                [`mobilebar__img--active mobilebar__img--active__${name}`]: activeOption === name,
              })}
              src={getAssetUrl(`./header/${name}${activeOption === name && name !== 'search' ? '-fill' : ''}.svg`)}
              alt={name}
            />
            <span className={classNames('mobilebar__title', { 'mobilebar__title--active': activeOption === name })}>
              {value.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MobileBar;
