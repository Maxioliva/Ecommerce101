import { MouseEvent, useContext, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import CartContext from '../../../utils/StateContext';
import useIsMobile from '../../../utils/useIsMobile';
import Button from '../../atoms/button';
import Icon from '../../atoms/icono';
import Spinner from '../../atoms/loadingSpinner';
import './style.scss';

type View = 'list' | 'gridx2' | 'gridx3';

const Products = () => {
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<{ current: View; next: View }>({ current: 'gridx2', next: 'gridx3' });
  const { wishList, wishListHandler, addItemToCart, searchResult, getString, fetchProducts } = useContext(CartContext);
  const navigate = useNavigate();
  const toggleView = () => {
    if (mobileView.current === 'gridx2') {
      setMobileView({ current: 'gridx3', next: 'list' });
    } else if (mobileView.current === 'gridx3') {
      setMobileView({ current: 'list', next: 'gridx2' });
    } else {
      setMobileView({ current: 'gridx2', next: 'gridx3' });
    }
  };

  const handlerAddtoCart = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    addItemToCart(id);
    e.stopPropagation();
  };

  const addTowishList = (id: string, e: MouseEvent<HTMLDivElement>) => {
    wishListHandler(id);
    e.stopPropagation();
  };

  const handlerScroll = () => fetchProducts(undefined, searchResult.skip + searchResult.limit);

  if (!searchResult.products.length) {
    return <Spinner />;
  }

  return (
    <div className="products">
      {isMobile && (
        <img
          className="products__view"
          onClick={toggleView}
          src={getAssetUrl(`./products/${mobileView.next}.svg`)}
          alt={mobileView.next}
        />
      )}
      <InfiniteScroll
        dataLength={searchResult.products.length}
        next={handlerScroll}
        hasMore={!!(searchResult.total - (searchResult.skip + searchResult.limit))}
        loader={<Spinner />}
        className="products__list"
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {searchResult.products.map(product => (
          <div
            className={`products__card products__card--${mobileView.current}`}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Icon
              value={!!wishList.find(item => item.id === product.id)}
              size={25}
              icon="wishlist"
              onClick={(e: MouseEvent<HTMLDivElement>) => addTowishList(product.id, e)}
            />
            <img className="products__image" src={product.images[0]} alt={product.title} />
            <h3 className="products__title">{product.title}</h3>
            <div className="product__category">{`${getString('details.category')}: ${product.category}`} </div>
            <div className="products__price">{`${getString('details.price')}: $ ${product.price}`} </div>
            <Button className="products__button" onClick={e => handlerAddtoCart(product.id, e)}>
              {getString('buttons.addToCart')}{' '}
            </Button>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Products;
