import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import CartContext from '../../../utils/StateContext';
import { FullProduct } from '../../../utils/Type';
import Button from '../../atoms/button';
import Icon from '../../atoms/icono';
import './style.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { searchProduct, wishListHandler, wishList, addItemToCart } = useContext(CartContext);
  const [searchDeails, setSearchDetails] = useState<FullProduct>();

  useEffect(() => {
    (async () => {
      const response = await searchProduct(id!);
      setSearchDetails(response);
    })();
  }, []);

  if (!searchDeails) {
    return <p>Loading</p>;
  }

  return (
    <div className="productdetail">
      <div className="productdetail__principal"></div>
      <img className="productdetail__principal-image" src={searchDeails?.images[0]} alt={searchDeails?.title} />
      <div className="productdetail__secundary">
        <div className="productdetail__secundary-title">{searchDeails.title}</div>
        <p className="productdetail__secundary-description">{searchDeails.description}</p>
        <span className="productdetail__secundary-brand">Brand: {searchDeails.brand}</span>
        <span className="productdetail__secundary-category">Category: {searchDeails.category}</span>
        <span className="productdetail__secundary-rating">Rating: {searchDeails.rating}</span>
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
              <div className="productdetail__payment__texts-text-speech">
                Agrega el producto al carrito para conocer los costos de envío.
              </div>
            </div>
            <div className="productdetail__payment__texts-text">
              <Icon size={25} icon="debitcard" deactivateHover />
              <div className="productdetail__payment__texts-text-speech">
                Te regalamos un 10% de descuento pagando con debito !
              </div>
            </div>
            <div className="productdetail__payment__texts-text">
              <Icon size={25} icon="delivery" deactivateHover />
              <div className="productdetail__payment__texts-text-speech">
                {' '}
                Recibe este producto de 7 a 10 días hábiles seleccionando envío.{' '}
              </div>
            </div>
          </div>
          <Button className="none" onClick={() => addItemToCart(id!)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
