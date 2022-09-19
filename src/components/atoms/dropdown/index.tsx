import { useState } from 'react';
import { getAssetUrl } from '../../../utils/config';
import './style.scss';

type DropDownProps = {
  control: 'cart' | 'profile' | 'wishlist';
  content: JSX.Element;
};

const DropDown = ({ control, content }: DropDownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="dropdown" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      <div className="dropdown__menu">
        {<img src={getAssetUrl(`header/${control}${isVisible ? '-fill' : ''}.svg`)} alt="basket" />}
      </div>
      {isVisible && <div className="dropdown__content">{content}</div>}
    </div>
  );
};

export default DropDown;
