import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import { SimpleOrder } from '../../../utils/Type';
import ItemList from '../../atoms/itemList';
import './style.scss';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const PreviousOrders = () => {
  const [completedOrders, setCompletedOrders] = useState<SimpleOrder[]>([]);
  const { user, getCompletedOrders, getString } = useContext(CartContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const orders = await getCompletedOrders(user.id);
      setCompletedOrders(orders);
    })();
  }, []);

  return (
    <div className="previousOrders">
      <div className="previousOrders__title">{getString('titles.yourLastOrders')}</div>
      <div className="previousOrders__container">
        {completedOrders.map((order, i) => (
          <div className="previousOrders__id" key={i}>
            <div className="previousOrders__address">
              {order.completedAt?.toDate().toLocaleString('es-AR', options as Intl.DateTimeFormatOptions)}
            </div>
            <div>
              {order.products.map((item, y) => (
                <ItemList key={y} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousOrders;
