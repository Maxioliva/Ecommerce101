import classNames from 'classnames';
import { useContext, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import SellProduct from '../../atoms/sellProduct';
import './style.scss';

type SubMenu = 'sell' | 'myProducts' | 'profile' | 'transaccions';

const subMenus: { label: string; value: SubMenu }[] = [
  {
    label: 'Vender Producto',
    value: 'sell',
  },
  {
    label: 'Mis Productos',
    value: 'myProducts',
  },
  {
    label: 'Mi Perfil',
    value: 'profile',
  },
  {
    label: 'Transacciones',
    value: 'transaccions',
  },
];

const random: Record<SubMenu, JSX.Element> = {
  sell: <SellProduct />,
  myProducts: <h1>my Producto</h1>,
  profile: <h1>profile</h1>,
  transaccions: <h1>transaccions</h1>,
};

const Seller = () => {
  const { state } = useContext(CartContext);
  const { user } = state;
  const [subMenu, setSubMenu] = useState<SubMenu>('sell');

  // const handler = () => {
  //   setSubmenu();
  // };

  return (
    <div className="sellers">
      <div className="sellers__user">
        <div className="sellers__userid">{`${user?.firstName} ${user?.lastName}`}</div>
        {subMenus.map(({ label, value }) => (
          <div
            className={classNames('sellers__user-button', { 'sellers__user-button--selected': subMenu === value })}
            key={value}
            onClick={() => setSubMenu(value)}
          >
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="sellers__block">{random[subMenu]}</div>
    </div>
  );
};

export default Seller;
