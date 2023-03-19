import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import { SimpleOrder } from '../../../utils/Type';
import ItemList from '../../atoms/itemList';
import './style.scss';

const getDate = (dateInSeconds: number, locale: string) => {
  const dateObject = new Date(dateInSeconds * 1000);
  const date = dateObject.toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return date;
};

const PreviousOrders = () => {
  const [completedOrders, setCompletedOrders] = useState<SimpleOrder[]>([]);
  const { user, getOrders, getString } = useContext(CartContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    (async () => {
      const orders = await getOrders(user.uid);
      setCompletedOrders(orders);
    })();
  }, []);
  if (!completedOrders.length) {
    return <span>loading</span>;
  }

  return (
    <div className="previousOrders">
      <div className="previousOrders__title">{getString('titles.yourLastOrders')}</div>
      <div className="previousOrders__container">
        {completedOrders.map((order, i) => (
          <div className="previousOrders__id" key={i}>
            <div className="previousOrders__address">{getDate(order.completedAt!, 'es-AR')}</div>
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
