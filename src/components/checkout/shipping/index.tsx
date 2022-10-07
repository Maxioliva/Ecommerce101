import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../context/CartContext';
import { createAddress, updateAdressOrder } from '../../../utils/resolvers';
import { Address } from '../../../utils/Type';
import OrderSummary from '../../molecules/orderSummary';
import AddressBook from './addressesBook';
import './style.scss';

const Shipping = () => {
  // const { values } = useFormikContext(Addresses);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const { user, order, getCurrentAddresses } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return <></>;
  }

  if (!order?.products.length) {
    navigate('/');
    return <></>;
  }

  const getAddressList = async () => {
    const currentAddresses = await getCurrentAddresses(user.id);
    setAddressList(currentAddresses);
  };

  const Addresss = {
    firstName: '',
    lastName: '',
    email: '',
    streetName: '',
    houseNumber: '',
    zipCode: '',
    city: '',
    country: '',
  };

  const submitHandler = (values: Omit<Address, 'id' | 'userId'>) => {
    updateAdressOrder(values, user.id);
    createAddress(values, user.id);
    navigate('/checkout-payment');
  };

  return (
    <div className="shipping">
      <Formik initialValues={Addresss} onSubmit={submitHandler}>
        <Form className="checkout">
          <div className="checkout__form">
            <AddressBook addressList={addressList} getAddressList={getAddressList} />
            <h1 className="checkout__h1">Shipping Information</h1>
            <Field className="checkout__Input" type="text" id="firstName" name="firstName" placeholder="First Name" />
            <Field className="checkout__Input" type="text" id="lastName" name="lastName" placeholder="Last Name" />
            <Field className="checkout__Input" type="email" id="email" name="email" placeholder="email" />
            <Field
              className="checkout__Input"
              type="text"
              id="streetName"
              name="streetName"
              placeholder="street Name"
            />
            <Field
              className="checkout__Input"
              type="number"
              id="houseNumber"
              name="houseNumber"
              placeholder="house Number"
            />
            <Field className="checkout__Input" type="number" id="zipCode" name="zipCode" placeholder="zipCode" />
            <Field className="checkout__Input" type="city" id="city" name="city" placeholder="city" />
            <Field className="checkout__Input" type="country" id="country" name="country" placeholder="country" />
            <button className="checkout__buttom" type="submit">
              {' '}
              Save Order Data
            </button>
          </div>
        </Form>
      </Formik>
      <OrderSummary />
    </div>
  );
};

export default Shipping;
