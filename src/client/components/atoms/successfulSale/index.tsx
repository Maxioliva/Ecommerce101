import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import './style.scss';

const SaleSuccess = () => {
  const { getString } = useContext(CartContext);

  return (
    <div className="order">
      <div className="order__container">
        <h1 className="order__h1">Successful Sale !</h1>
        <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
            fill="currentColor"
          />
        </svg>
        <div>
          <h2 className="order__h2">{getString('speech.orderSucerfull')}</h2>
        </div>

        <div className="order__buttonContainer">
          <NavLink to={'/orders'} className="order__button">
            My Products
          </NavLink>
          <NavLink to={'/sellProduct'} className="order__button">
            Sell Again
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SaleSuccess;
