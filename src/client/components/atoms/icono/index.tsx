import { useState } from 'react';
import { getAssetUrl } from '../../../utils/config';
import './style.scss';

type IconProps = {
  icon: 'notifications' | 'basket' | 'home' | 'products' | 'profile' | 'wishlist' | 'delivery' | 'debitcard';
  size: number;
  onClick?: () => void;
  value?: boolean;
  deactivateHover?: boolean;
};

const Icon = ({ value, size, icon, onClick, deactivateHover }: IconProps) => {
  const [hover, setHover] = useState(value ?? false);
  const iconPath = `./header/${icon}${!deactivateHover && hover ? '-fill' : ''}.svg`;
  const changeHover = () => setHover(!hover);
  const clickHandler = () => {
    onClick?.();
    changeHover();
  };

  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`icon icon__${icon} `}
      onMouseEnter={deactivateHover ? () => {} : changeHover}
      onMouseLeave={deactivateHover ? () => {} : changeHover}
      onClick={clickHandler}
    >
      <img src={getAssetUrl(iconPath)} alt={icon} style={{ height: `${size}px`, width: `${size}px` }} />
    </div>
  );
};

export default Icon;
