import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import './style.scss';

const Products = () => {
  const { addItemToCart, products } = useContext(CartContext);
  const [hover, setHover] = useState(false);
  if (!products || !products.length) {
    return <h1>hi</h1>;
  }

  return (
    <div className="products">
      <div className="products__filter">filter</div>
      <div className="products__list">
        {products?.map(product => (
          <div className="products__card" key={product.id}>
            <Link to="/wishlist">
              <div className="products__wish" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {hover && <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>}
                {!hover && <FontAwesomeIcon icon={faHeartRegular}></FontAwesomeIcon>}
              </div>
            </Link>
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
