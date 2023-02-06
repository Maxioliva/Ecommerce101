import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import { sanitizeAddress, updateBasket } from '../../../utils/resolvers';
import { Address } from '../../../utils/Type';
import OrderSummary from '../../atoms/orderSummary';
import './style.scss';
import AddressBook from '../../atoms/addressBook';
import Input from '../../atoms/input';
import { runValidation } from '../../../utils/validations';
import Button from '../../atoms/button';

const Shipping = () => {
  const [addressList, setAddressList] = useState<Address[]>([]);
  const { user, order, getCurrentAddresses, getString } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return <></>;
  }
  const getAddressList = async () => {
    const currentAddresses = await getCurrentAddresses(user.id);
    setAddressList(currentAddresses);
  };

  if (!order?.products.length) {
    navigate('/');
    return <></>;
  }

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
    updateBasket({ userId: user.id, address: values });
    sanitizeAddress(values, user.id);
    navigate('/checkout-payment');
  };

  return (
    <div className="shipping">
      <div className="shipping__form">
        <Formik initialValues={Addresss} onSubmit={submitHandler}>
          {({ errors }) => (
            <Form>
              <h1 className="shipping__title">{getString('titles.shippingInformation')}</h1>
              <AddressBook addressList={addressList} getAddressList={getAddressList} />
              <Field
                component={Input}
                name="firstName"
                label={getString('payment.firstName')}
                validate={(value: string) => runValidation(value, 'firstName')}
              />
              <Field
                component={Input}
                name="lastName"
                label={getString('payment.lastName')}
                validate={(value: string) => runValidation(value, 'lastName')}
              />
              <Field
                component={Input}
                name="street"
                label={getString('payment.street')}
                validate={(value: string) => runValidation(value, 'street')}
              />
              <Field
                component={Input}
                name="houseNumber"
                label={getString('payment.houseNumber')}
                validate={(value: string) => runValidation(value, 'houseNumber')}
              />
              <Field
                component={Input}
                name="zipCode"
                label={getString('payment.zipCode')}
                validate={(value: string) => runValidation(value, 'zipCode')}
              />
              <Field
                component={Input}
                name="city"
                label={getString('payment.city')}
                validate={(value: string) => runValidation(value, 'city')}
              />
              <Field
                component={Input}
                name="country"
                label={getString('payment.country')}
                validate={(value: string) => runValidation(value, 'country')}
              />
              <Button type="submit">{getString('buttons.continue')}</Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="shipping__order">
        <OrderSummary className="shipping__order__basket" />
      </div>
    </div>
  );
};

export default Shipping;
