import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Product } from '../../utils/Type';

// const ProductContext = createContext('');

// export const ProductProvider = ({ children }: any) => {
const Products = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
      // eslint-disable-next-line promise/prefer-await-to-then
    }).then(res => {
      // eslint-disable-next-line no-undef
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className="products">
      {data.map(product => (
        // eslint-disable-next-line react/jsx-key
        <div className="card">
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
                <button className="product-add-button">Add to Cart</button>{' '}
              </div>
            </div>
          </div>
        </div>
      ))}
      );
    </div>
  );
};
// return <ProductContext.Provider value={{  }}>{children}</ProductContext.Provider>;

export default Products;
