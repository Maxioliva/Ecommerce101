import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';
import Icon from '../../atoms/icono';
import Spinner from '../../atoms/loadingSpinner';
import { getAssetUrl } from '../../../utils/config';
import useIsMobile from '../../../utils/useIsMobile';
import Button from '../../atoms/button';
import { getAllProducts } from '../../../utils/ProductsResolvers';
import { Product } from '../../../utils/Type';

type View = 'list' | 'gridx2' | 'gridx3';

const Products = () => {
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<{ current: View; next: View }>({ current: 'gridx2', next: 'gridx3' });
  const { wishList, wishListHandler, addItemToCart, products } = useContext(CartContext);
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const toggleView = () => {
    if (mobileView.current === 'gridx2') {
      setMobileView({ current: 'gridx3', next: 'list' });
    } else if (mobileView.current === 'gridx3') {
      setMobileView({ current: 'list', next: 'gridx2' });
    } else {
      setMobileView({ current: 'gridx2', next: 'gridx3' });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllProducts();
        setSearchResult(result.products);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!products || !products.length) {
    return <Spinner />;
  }

  console.log(searchResult);
  return (
    <div className="products">
      {/* <div className="products__filter">filter</div> */}
      {isMobile && (
        <img
          className="products__view"
          onClick={toggleView}
          src={getAssetUrl(`./products/${mobileView.next}.svg`)}
          alt={mobileView.next}
        />
      )}
      <div className="products__list">
        {searchResult?.map(product => (
          <div className={`products__card products__card--${mobileView.current}`} key={product.id}>
            <Icon
              value={!!wishList.find(item => item.id === product.id)}
              size={25}
              icon="wishlist"
              onClick={() => wishListHandler(product)}
            />
            <img className="products__image" src={product.images[0]} alt={product.title} />
            <h3 className="products__title">{product.title}</h3>
            <div className="product__category">{`Category: ${product.category}`} </div>
            <div className="products__price">{`Price: $ ${product.price}`} </div>
            <Button className="products__button" onClick={() => addItemToCart(product)}>
              Add to Cart{' '}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
