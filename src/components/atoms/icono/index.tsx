import { useState } from 'react';
import './style.scss';
import { getAssetUrl } from '../../../utils/config';

type IconProps = {
  icon: 'wishlist' | 'profile' | 'cart';
  size: number;
  onClick: () => void;
  value?: boolean;
};

const Icon = ({ value, size, icon, onClick }: IconProps) => {
  const [hover, setHover] = useState(value ?? false);
  const iconPath = `./header/${icon}${hover ? '-solid' : ''}.svg`;
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`icon icon__${icon} `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <img src={getAssetUrl(iconPath)} alt={icon} style={{ height: `${size}px`, width: `${size}px` }} />
    </div>
  );
};

export default Icon;
