/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-key */
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import Shipping from '..';
import CartContext from '../../../../context/CartContext';
import { deleteAddresses } from '../../../../utils/resolvers';
import { Address } from '../../../../utils/Type';
import './style.scss';

type AddressBookProps = {
  addressList: Address[];
  getAddressList: () => Promise<void>;
};

const AddressBook = ({ addressList, getAddressList }: AddressBookProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addressChossen, setAddressChossen] = useState<Address>();
  const { values, setValues } = useFormikContext();

  const completeAddress = () => {
    setValues(addressChossen);
    setIsVisible(false);
  };

  useEffect(() => {
    getAddressList();
  }, []);

  useEffect(() => {
    getAddressList();
  }, [addressList]);

  return (
    <div className="address-book">
      <div onClick={() => setIsVisible(!isVisible)}> Addresses Book</div>

      {isVisible && (
        <div className="address-book__container">
          <div className="address-book__list">
            <p className="address-book__title">Choose a Shipping Address</p>
            <ul className="address-book__addresses">
              {addressList?.map(address => (
                <li className="address-book__card" key={address.id} onClick={() => setAddressChossen(address)}>
                  <h3 className="address-book__info">{address.country}</h3>
                  <h3 className="address-book__info">{address.city}</h3>
                  <h3 className="address-book__info">{address.streetName}</h3>
                  <h3 className="address-book__info">{address.houseNumber}</h3>
                  <h3 className="address-book__info">{address.zipCode}</h3>
                  <div className="address-book__delete" onClick={() => deleteAddresses(address.id)}>
                    Delete
                  </div>
                </li>
              ))}
            </ul>
            <div className="address-book__buttons">
              <div className="address-book__cancel" onClick={() => setIsVisible(!isVisible)}>
                Cancel
              </div>
              <button
                className="address-book__button"
                type="button"
                onClick={completeAddress}
                disabled={!addressChossen}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
