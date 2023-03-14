import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import { FullProduct } from '../../../utils/Type';
import Button from '../../atoms/button';
import Carousel from '../../atoms/carousel';
import Icon from '../../atoms/icono';
import './style.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { wishListHandler, wishList, addItemToCart, getString } = useContext(CartContext);
  const [searchDeails, setSearchDetails] = useState<FullProduct>();

  if (!searchDeails) {
    return <p>Loading</p>;
  }

  return (
    <div className="productdetail">
      <div className="productdetail__principal"></div>
      <div className="productdetail__principal-image">
        <Carousel images={searchDeails.images} />
      </div>
      <div className="productdetail__secundary">
        <div className="productdetail__secundary-title">{searchDeails.title}</div>
        <p className="productdetail__secundary-description">{searchDeails.description}</p>
        <span className="productdetail__secundary-brand">
          {getString('details.brand')}: {searchDeails.brand}
        </span>
        <span className="productdetail__secundary-category">
          {getString('details.category')}: {searchDeails.category}
        </span>
        <span className="productdetail__secundary-rating">
          {getString('details.rating')}: {searchDeails.rating}
        </span>
      </div>
      <div className="productdetail__payment">
        <div className="productdetail__payment-header">
          <img className="productdetail__payment-header-image" src={searchDeails.thumbnail} alt={searchDeails.title} />
          <div className="productdetail__payment-header-right">
            <Icon
              value={!!wishList.find(item => item.id === id)}
              size={25}
              icon="wishlist"
              onClick={() => wishListHandler(searchDeails.id)}
            />
            <span className="productdetail__payment-header-right-stock">Stock: {searchDeails.stock}</span>
            <span className="productdetail__payment-header-right-price">$ {searchDeails.price}</span>
          </div>
        </div>
        <div className="productdetail__payment__texts">
          <div className="productdetail__payment__texts-title">{searchDeails.title}</div>
          <div className="texts">
            <div className="productdetail__payment__texts-text">
              <Icon size={25} icon="basket" deactivateHover />
              <div className="productdetail__payment__texts-text-speech">{getString('speech.detailsAddToCard')}</div>
            </div>
            <div className="productdetail__payment__texts-text">
              <Icon size={25} icon="debitcard" deactivateHover />
              <div className="productdetail__payment__texts-text-speech">{getString('speech.detailsDiscount')}</div>
            </div>
            <div className="productdetail__payment__texts-text">
              <Icon size={25} icon="delivery" deactivateHover />
              <div className="productdetail__payment__texts-text-speech">{getString('speech.detailShipping')}</div>
            </div>
          </div>
          <Button className="none" onClick={() => addItemToCart(id!)}>
            {getString('buttons.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
