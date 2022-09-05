import { useContext } from 'react';
import CartContext from '../../../context/CartContext';
import { getAssetUrl } from '../../../utils/config';
import { Formik, Field, Form } from 'formik';
import { updatePayment } from '../../../utils/resolvers';

const Payment = () => {
  const { userInfo } = useContext(CartContext);

  if (!userInfo) {
    return <></>;
  }

  const initialValues = {
    picked: '',
  };

  const submitHandler = (values: typeof initialValues) => {
    updatePayment(userInfo.id, values.picked);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {({ values }) => (
        <Form>
          <h1>Choose payment method</h1>
          <div className="payment">
            <label>
              <Field type="radio" name="picked" value="AmazonPay" />
              <img src={getAssetUrl('./payment/amazonPay.svg')} />
            </label>
            <label>
              <Field type="radio" name="picked" value="maestro" />
              <img src={getAssetUrl('./payment/maestro.svg')} />
            </label>
            <label>
              <Field type="radio" name="picked" value="mastercard" />
              <img src={getAssetUrl('./payment/mastercard.svg')} />
            </label>
            <label>
              <Field type="radio" name="picked" value="payPal" />
              <img src={getAssetUrl('./payment/payPal.svg')} />
            </label>
            <label>
              <Field type="radio" name="picked" value="visa" />
              <img src={getAssetUrl('./payment/visa.svg')} />
            </label>
          </div>
          <div>Picked: {values.picked}</div>

          <button type="submit">Confirm Payment</button>
        </Form>
      )}
    </Formik>
  );
};
export default Payment;
