import { useContext } from 'react';
import CartContext from '../../../context/CartContext';
import { getAssetUrl } from '../../../utils/config';
import { Formik, Field, Form } from 'formik';
import { getCurrentOrder, updatePayment } from '../../../utils/resolvers';
import './style.scss';

const Payment = () => {
  const { user, getOrder } = useContext(CartContext);

  if (!user) {
    return <></>;
  }

  const initialValues = {
    picked: '',
  };

  const submitHandler = (values: typeof initialValues) => {
    updatePayment(user.id, values.picked);
    getOrder(user.id);
  };

  return (
    <Formik classname="payment" initialValues={initialValues} onSubmit={submitHandler}>
      {({ values }) => (
        <Form className="payment__f1">
          <h1 className="payment__h1">Choose Payment Method</h1>
          <div>
            <label className="payment__picked">
              <Field className="payment__field" type="radio" name="picked" value="AmazonPay" />
              <img className="payment__img" src={getAssetUrl('./payment/amazonPay.svg')} />
            </label>
            <label className="payment__picked">
              <Field className="payment__field" type="radio" name="picked" value="maestro" />
              <img className="payment__img" src={getAssetUrl('./payment/maestro.svg')} />
            </label>
            <label className="payment__picked">
              <Field className="payment__field" type="radio" name="picked" value="mastercard" />
              <img className="payment__img" src={getAssetUrl('./payment/mastercard.svg')} />
            </label>
            <label className="payment__picked">
              <Field className="payment__field" type="radio" name="picked" value="payPal" />
              <img className="payment__img" src={getAssetUrl('./payment/payPal.svg')} />
            </label>
            <label className="payment__picked">
              <Field className="payment__field" type="radio" name="picked" value="visa" />
              <img className="payment__img" src={getAssetUrl('./payment/visa.svg')} />
            </label>
          </div>
          <div className="payment__textbutton">Picked: {values.picked}</div>

          <button className="payment__button" type="submit">
            Confirm Payment
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Payment;
