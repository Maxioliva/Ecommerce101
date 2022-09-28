import { useContext } from "react";
import CartContext from "../../../../../context/CartContext";

const PreviousOrders = () => {
  const { ordersCompleted } = useContext(CartContext);

  return (

    <div className="orderSucerfull">
      <div className="orderSucerful__filter">Your Orders</div>
      <div>
        {ordersCompleted.map((order, i) => (
          <div className="orderSucerful__id" key={i}>
            {/* <div>{order.total}</div> */}

            {/* <img className="orderSucerful__image" src={order.products.image} alt={order.title}></img> */}
            <div className="orderSucerful__address">{order.completedAt?.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>);
};

export default PreviousOrders;
