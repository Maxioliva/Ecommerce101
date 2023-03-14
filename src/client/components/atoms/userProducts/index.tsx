import { useContext, useState } from 'react';
import { getUserProduct } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { SellerProduct } from '../../../utils/Type';

type ItemListProps = {
  item: SellerProduct;
};

const UserProducts = ({ item }: ItemListProps) => {
  const {user} = useContext(CartContext)
  const [seller, setSeller] = useState<SellerProduct[]>([]);

  const userProduct = async () => {
    const response = await getUserProduct(user!.id)
    setSeller(response)
}


  return <div className="list">
    {seller.map((item, i) => ())}
  </div>;
};

export default UserProducts;
