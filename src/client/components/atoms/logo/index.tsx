import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './style.scss';
// import './utils/variables';

type LogoProps = {
  secondary?: boolean;
  className?: string;
};

const Logo = ({ secondary, className }: LogoProps) => (
  <Link className="link" to="/">
    <span className={classNames('logo', { 'logo--secondary': secondary }, className)}>ELCHAMUYIN</span>
  </Link>
);

export default Logo;
