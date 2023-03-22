import { useContext, useEffect, useState } from 'react';
import { getUserProduct } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { Product } from '../../../utils/Type';

const MyProducts = () => {
  const { state } = useContext(CartContext);
  const { user } = state;
  const [userProduct, setUserProduct] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserProduct(user!.uid);
        if (response) {
          setUserProduct(response);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="MyProducts">
      {userProduct.map(product => (
        <div key={product.id}>
          <div className="MyProducts">
            {/* <img className="MyProducts__image" src={product.images[0]} alt={product.title} /> */}
            <div className="MyProducts__price">&nbsp;${product.price}&nbsp;</div>
            <div className="MyProducts__texts">
              <h3 className="MyProducts__texts-title">{product.title}</h3>
              <h3 className="MyProducts__texts-title">{product.brand}</h3>
              <h3 className="MyProducts__texts-title">{product.colors}</h3>
              <h3 className="MyProducts__texts-title">{product.categories}</h3>
              <h3 className="MyProducts__texts-title">{product.description}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
