import classNames from 'classnames';
import { useContext, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import MyProducts from '../../atoms/myProducts';
import SellProduct from '../../atoms/sellProduct';
import './style.scss';

type SubMenu = 'sell' | 'myProducts' | 'profile' | 'transaccions';

const subMenus: Record<SubMenu, { form?: JSX.Element; label: string }> = {
  sell: { label: 'Vender Producto', form: <SellProduct /> },
  myProducts: { label: 'Mis Productos', form: <MyProducts /> },
  profile: { label: 'Mi Perfil' },
  transaccions: { label: 'Transacciones' },
};

const Seller = () => {
  const { state } = useContext(CartContext);
  const { user } = state;
  const [subMenu, setSubMenu] = useState<SubMenu>('sell');

  return (
    <div className="sellers">
      <div className="sellers__user">
        <div className="sellers__userid">{`${user?.firstName} ${user?.lastName}`}</div>
        {Object.entries(subMenus).map(([value, { label }]) => (
          <div
            className={classNames('sellers__user-button', { 'sellers__user-button--selected': subMenu === value })}
            key={value}
            onClick={() => setSubMenu(value as SubMenu)}
          >
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="sellers__block">{subMenus[subMenu].form}</div>
    </div>
  );
};

export default Seller;
