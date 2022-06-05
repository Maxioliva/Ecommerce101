import { Link } from 'react-router-dom';
import './style.scss';

const Logo = () => (
  <Link to={'/'} style={{ textDecoration: 'none' }}>
    <div className="logo__container">
      <span className="logo__letters">The sh</span>
      <div className="logo">
        <span className="logo__gilada">
          <span className="logo__nucleo"></span>
        </span>
      </div>
      <span className="logo__letters">p</span>
    </div>
  </Link>
);

export default Logo;
