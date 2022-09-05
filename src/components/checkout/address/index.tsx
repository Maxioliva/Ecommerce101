import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import CartContext from '../../../context/CartContext';
import { updateAdressOrder } from '../../../utils/resolvers';
import { Address } from '../../../utils/Type';
import './style.scss';

const Checkout = () => {
  const { userInfo } = useContext(CartContext);

  if (!userInfo) {
    return <></>;
  }

  const Addresss = {
    firstName: '',
    lastName: '',
    email: '',
    streetName: '',
    houseNumber: '',
    zipCode: '',
    city: '',
    country: '',
    id: userInfo.id,
  };

  const submitHandler = (values: Address) => {
    updateAdressOrder(values, userInfo.id);
  };

  return (
    <Formik initialValues={Addresss} onSubmit={submitHandler}>
      <Form className="checkout">
        <div className="checkout__form">
          <Field className="checkout__Input" type="text" id="firstName" name="firstName" placeholder="First Name" />
          <Field className="checkout__Input" type="text" id="lastName" name="lastName" placeholder="Last Name" />
          <Field className="checkout__Input" type="email" id="email" name="email" placeholder="email" />
          <Field className="checkout__Input" type="text" id="streetName" name="streetName" placeholder="street Name" />
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
  );
};

export default Checkout;
