import { useContext, useEffect, useState } from "react";
import CartContext from "../../../../../context/CartContext";
import { SimpleOrder } from "../../../../../utils/Type";

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
  const { user, getCompletedOrders } = useContext(CartContext);

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

    <div className="orderSucerfull">
      <div className="orderSucerful__filter">Your Orders 1</div>
      <div>
        {completedOrders.map((order, i) => (
          <div className="orderSucerful__id" key={i}>
            {/* <div>{order.total}</div> */}

            {/* <img className="orderSucerful__image" src={order.products.image} alt={order.title}></img> */}
            <div className="orderSucerful__address">{order.completedAt?.toDate().toLocaleString('es-AR', options as Intl.DateTimeFormatOptions)}</div>
          </div>
        ))}
      </div>
    </div>);
};

export default PreviousOrders;
