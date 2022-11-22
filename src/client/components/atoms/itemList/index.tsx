import './style.scss';

const ItemList = ({ item }: any) => (
  <div className="cartItem">
    <img className="product-cart" src={item.image} />
    <div className="dataContainer">
      <div className="left">
        <div className="item-title">
          <p>{item.title}</p>
        </div>
      </div>
      <div className="right">
        <div>${item.price}</div>
      </div>
    </div>
  </div>
);

export default ItemList;
