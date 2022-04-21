import { useEffect, useState } from 'react';

import axios from 'axios';
import './style.scss';

const Products = () => {
  const [data, setData] = useState([]);

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
    <div className="productcontainer">
      {data.map((product: any) => (
        <div key={product.id} className="card">
          <div>
            <img src={product.image} alt="#" />
          </div>
          <div className="card-description">
            <h6>{product.title}</h6>
            <h6>{`Price: ${product.price}`}</h6>
            <h6>{`Category: ${product.category}`}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Products;
