import './style.scss';

// eslint-disable-next-line arrow-body-style
export const ItemList = ({ item }: any) => {
  return (
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
};
