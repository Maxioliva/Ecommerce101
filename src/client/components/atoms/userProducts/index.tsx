import { useContext, useState } from 'react';
import { getUserProduct } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { Product } from '../../../utils/Type';

type ItemListProps = {
  item: Product;
};

const UserProducts = ({ item }: ItemListProps) => {
  const { state } = useContext(CartContext);
  const { user } = state;
  const [seller, setSeller] = useState<Product[]>([]);

  const userProduct = async () => {
    const response = await getUserProduct(user!.uid);
    setSeller(response);
  };

  return (
    <div className="list">
      productos que estan para vender
      {/* {seller.map((item, i) => ())} */}
    </div>
  );
};

export default UserProducts;
