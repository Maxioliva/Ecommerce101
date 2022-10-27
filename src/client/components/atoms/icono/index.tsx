import { useState } from 'react';
import './style.scss';
import { getAssetUrl } from '../../../utils/config';

type IconProps = {
  icon: 'wishlist' | 'profile' | 'cart' | 'products';
  size: number;
  onClick: () => void;
  value?: boolean;
};

const Icon = ({ value, size, icon, onClick }: IconProps) => {
  const [hover, setHover] = useState(value ?? false);
  const iconPath = `./header/${icon}${hover ? '-fill' : ''}.svg`;
  const changeHover = () => setHover(!hover);
  const clickHandler = () => {
    onClick();
    changeHover();
  };

  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`icon icon__${icon} `}
      onMouseEnter={changeHover}
      onMouseLeave={changeHover}
      onClick={clickHandler}
    >
      <img src={getAssetUrl(iconPath)} alt={icon} style={{ height: `${size}px`, width: `${size}px` }} />
    </div>
  );
};

export default Icon;
