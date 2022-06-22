import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './style.scss';

const Products = () => {
  const { addItemToCart, products } = useContext(CartContext);
  if (!products || !products.length) {
    return <h1>hi</h1>;
  }

  return (
    <div className="products">
      <div className="products__filter">filter</div>
      <div className="products__list">
        {products?.map(product => (
          <div className="products__card" key={product.id}>
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
