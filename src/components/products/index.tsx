import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import './style.scss';
import Icon from '../atoms/icono';

const Products = () => {
  const { wishListHandler, addItemToCart, products } = useContext(CartContext);

  if (!products || !products.length) {
    return <h1>hi</h1>;
  }

  // const handler (id: string) => {
  //   id
  // }

  return (
    <div className="products">
      <div className="products__filter">filter</div>
      <div className="products__list">
        {products?.map(product => (
          <div className="products__card" key={product.id}>
            <Icon value={true} size={25} icon="wishlist" onClick={() => wishListHandler(product)} />
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
