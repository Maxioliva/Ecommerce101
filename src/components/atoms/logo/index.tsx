import { Link } from 'react-router-dom';
import './style.scss';

const Logo = () => (
  <Link to={'/'}>
    <div className="logo">
      <span className="logo__gilada">
        <span className="logo__nucleo"></span>
      </span>
    </div>
  </Link>
);

export default Logo;
