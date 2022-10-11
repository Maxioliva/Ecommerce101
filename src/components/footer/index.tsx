
import { Link } from 'react-router-dom';
import './style.scss';



const Footer = () => {
  return (

    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Fake<span>Products</span>
        </h3>

        <div className="footer-links">
          <Link to="/" className="link-1">
            Home
          </Link>

          <Link to="/">Blog</Link>

          <Link to="/">Pricing</Link>

          <Link to="/about">About Us</Link>

          <Link to="/">Faq</Link>

          <Link to="/">Contact</Link>

        </div>

        <p className="footer-company-name">Company Name © 2022</p>
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
            <a href="mailto:support@company.com">support@fakeproducts.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          This is a virtual e-shop, created for educational purposes{' '}
        </p>
      </div>
    </footer>

  );
};
export default Footer;
