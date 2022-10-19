import { Link } from 'react-router-dom';
import './style.scss';
// import './utils/variables';

// type LogoType = {
//   white: $thirdcolor;
//   blue:
// }

const Logo = () => (
  <Link className="link" to="/">
    <h1 className="logo">ELCHAMUYIN</h1>
  </Link>
);

export default Logo;
