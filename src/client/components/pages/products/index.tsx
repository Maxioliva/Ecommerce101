import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import Icon from '../../atoms/icono';
import './style.scss';

const Products = () => {
  const { wishList, wishListHandler, addItemToCart, products } = useContext(CartContext);

  if (!products || !products.length) {
    return <h1>loading products</h1>;
  }

  return (
    <div className="products">
      <div className="products__filter">filter</div>
      <div className="products__list">
        {products?.map(product => (
          <div className="products__card" key={product.id}>
            <Icon
              value={!!wishList.find(item => item.id === product.id)}
              size={25}
              icon="wishlist"
              onClick={() => wishListHandler(product)}
            />
            <img className="products__image" src={product.image} alt={product.title} />
            <h3 className="products__title">{product.title}</h3>
            <div className="product__category">{`Category: ${product.category}`} </div>
            <div className="products__price">{`Price: $ ${product.price}`} </div>
            <button className="products__button" onClick={() => addItemToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
