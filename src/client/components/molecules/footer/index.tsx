import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import Logo from '../../atoms/logo';
import './style.scss';

const Footer = () => {
  const { handlers } = useContext(CartContext);
  const { getString } = handlers;

  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <Logo secondary />
        <div className="footer-links">
          <Link to="/" className="link-1">
            Home
          </Link>

          <Link to="/">Blog</Link>

          <Link to="/">{getString('footer.pricing')}</Link>

          <Link to="/about">{getString('footer.aboutUs')}</Link>

          <Link to="/">{getString('footer.faq')}</Link>

          <Link to="/">{getString('footer.contact')}</Link>
        </div>

        <p className="footer-company-name">{getString('footer.companyName')}</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Avenida Siempreviva 742 </span> Córdoba, Argentina
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+1.555.555.5555</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">{getString('footer.supportEmail')}</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>{getString('footer.about')}</span>
          {getString('footer.purpose')}{' '}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
