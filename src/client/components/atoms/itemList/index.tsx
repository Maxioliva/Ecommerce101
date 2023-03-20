import { Product } from '../../../utils/Type';
import './style.scss';

type ItemListProps = {
  item: Product;
};

const ItemList = ({ item }: ItemListProps) => (
  <div className="itemList">
    {!!item.images && <img className="product-cart" src={item.images[0] ?? ''} />}
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
