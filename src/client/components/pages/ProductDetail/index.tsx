import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import { FullProduct } from '../../../utils/Type';
import './style.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { searchProduct } = useContext(CartContext);
  const [searchDeails, setSearchDetails] = useState<FullProduct>();

  useEffect(() => {
    (async () => {
      const response = await searchProduct(id!);
      setSearchDetails(response);
    })();
  }, []);

  return (
    <div className="productdetail">
      <div className="productdetail__principal">
        <img className="productdetail__principal-image" src={searchDeails?.images[0]} alt={searchDeails?.title} />
      </div>
      <div className="productdetail__secundary">
        <div className="productdetail__secundary-title">{searchDeails?.title}</div>
        <p className="productdetail__secundary-description">{searchDeails?.description}</p>
        <span className="productdetail__secundary-price">$ {searchDeails?.price}</span>
        <span className="productdetail__secundary-brand">Brand: {searchDeails?.brand}</span>
        <span className="productdetail__secundary-category">Category: {searchDeails?.category}</span>
        <span className="productdetail__secundary-rating">Rating: {searchDeails?.rating}</span>
      </div>
      <div className="productdetail__payment">
        <img className="productdetail__payment-image" src={searchDeails?.thumbnail} alt={searchDeails?.title} />
        <div className="productdetail__payment__texts">
          <span className="productdetail__payment__texts-stock">Stock: {searchDeails?.stock}</span>
          <div className="productdetail__payment__texts-title">{searchDeails?.title}</div>
          <button>add to cart</button>
          <button>Buy it Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
