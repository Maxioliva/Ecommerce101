import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import { deleteAddresses } from '../../../utils/resolvers';
import { Address } from '../../../utils/Type';
import './style.scss';

type AddressBookProps = {
  addressList: Address[];
  getAddressList: () => Promise<void>;
};

const AddressBook = ({ addressList, getAddressList }: AddressBookProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [addressSelected, setAddressSelected] = useState<Address>();
  const { values, setValues } = useFormikContext();

  const completeAddress = () => {
    setValues(addressSelected);
    setIsVisible(false);
  };

  useEffect(() => {
    getAddressList();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      await deleteAddresses(id);
      await getAddressList();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="address-book">
      <div className="address-book__title2" onClick={() => setIsVisible(!isVisible)}>
        {' '}
        Addresses Book
      </div>
      {isVisible && (
        <div className="address-book__container">
          <div className="address-book__list">
            <p className="address-book__title">Choose a Shipping Address</p>
            <ul className="address-book__addresses">
              {addressList?.map(address => (
                <li
                  className={classNames('address-book__card', {
                    'address-book__card--selected': addressSelected?.id === address.id,
                  })}
                  key={address.id}
                  onClick={() => {
                    setAddressSelected(address);
                  }}
                >
                  <h3 className="address-book__info">
                    {address.firstName} {address.lastName}
                  </h3>
                  <h3 className="address-book__info">
                    {address.houseNumber} - {address.street}
                  </h3>
                  <h3 className="address-book__info">
                    {address.zipCode} - {address.city}
                  </h3>
                  <h3 className="address-book__info">{address.country}</h3>
                  <div className="address-book__delete" onClick={() => deleteHandler(address.id)}>
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
                disabled={!addressSelected}
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
