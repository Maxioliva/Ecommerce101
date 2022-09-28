/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import CartContext from '../../../../context/CartContext';

const Addresses = () => {
  const { addressList } = useContext(CartContext);

  return (
    <div className="addresses">
      <div className="addresses__card">
        {addressList?.map(address => (
          <h1>{address.email.}</h1>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
