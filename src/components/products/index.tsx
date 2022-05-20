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
      {products?.map(product => (
        <div className="card" key={product.id}>
          <div>
            <img className="product-image" src={product.image} alt={product.title} />
            <div />
            <div>
              <h3 className="product-title">{product.title}</h3>
              <div />
              <div className="product-price">{`Price: $ ${product.price}`} </div>
              <div className="product-category">{`Category: ${product.category}`} </div>
              <div className="wrap">
                {' '}
                <button className="product-add-button" onClick={() => addItemToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
