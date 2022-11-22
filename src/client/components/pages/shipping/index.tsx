import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import { sanitizeAddress, updateAdressOrder } from '../../../utils/resolvers';
import { Address } from '../../../utils/Type';
import OrderSummary from '../../atoms/orderSummary';
import './style.scss';
import AddressBook from '../../atoms/addressBook';
import Input from '../../atoms/input';
import { runValidation } from '../../../utils/validations';
import Button from '../../atoms/button';

const Shipping = () => {
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
    street: '',
    houseNumber: '',
    zipCode: '',
    city: '',
    country: '',
  };

  const submitHandler = (values: Omit<Address, 'id' | 'userId'>) => {
    updateAdressOrder(values, user.id);
    sanitizeAddress(values, user.id);
    navigate('/checkout-payment');
  };

  return (
    <div className="shipping">
      <div className="shipping__form">
        <Formik initialValues={Addresss} onSubmit={submitHandler}>
          {({ errors }) => (
            <Form>
              <h1 className="shipping__title">Shipping Information</h1>
              <AddressBook addressList={addressList} getAddressList={getAddressList} />
              <Field
                component={Input}
                name="firstName"
                label="First Name"
                validate={(value: string) => runValidation(value, 'firstName')}
              />
              <Field
                component={Input}
                name="lastName"
                label="Last Name"
                validate={(value: string) => runValidation(value, 'lastName')}
              />
              <Field
                component={Input}
                name="street"
                label="Street"
                validate={(value: string) => runValidation(value, 'street')}
              />
              <Field
                component={Input}
                name="houseNumber"
                label="House Number"
                validate={(value: string) => runValidation(value, 'houseNumber')}
              />
              <Field
                component={Input}
                name="zipCode"
                label="Zip Code"
                validate={(value: string) => runValidation(value, 'zipCode')}
              />
              <Field
                component={Input}
                name="city"
                label="City"
                validate={(value: string) => runValidation(value, 'city')}
              />
              <Field
                component={Input}
                name="country"
                label="Country"
                validate={(value: string) => runValidation(value, 'country')}
              />
              <Button type="submit">Save Order Data</Button>
            </Form>
          )}
        </Formik>
      </div>
      <OrderSummary />
    </div>
  );
};

export default Shipping;
