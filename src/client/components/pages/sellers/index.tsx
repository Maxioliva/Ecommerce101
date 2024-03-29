import { useContext, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import SellProduct from '../../atoms/sellProduct';
import './style.scss';

const Seller = () => {
  const { state } = useContext(CartContext);
  const { user } = state;

  return (
    <div className="sellers">
      <div className="sellers__user">
        <div className="sellers__userid">{`${user?.firstName} ${user?.lastName}`}</div>
        <div className="sellers__user-button">
          <span>Vender Producto</span>
        </div>
        <div className="sellers__user-button">
          <span>Mis ventas</span>
        </div>
        <div className="sellers__user-button">
          <span>Mis productos</span>
        </div>
        <div className="sellers__user-button">
          <span>opciones para el perfil</span>
        </div>
      </div>

      <div className="sellers__block">
        <SellProduct />
      </div>
    </div>
  );
};

export default Seller;
