import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import CartContext from '../../../utils/StateContext';
import Button from '../../atoms/button';
import OrderSummary from '../../atoms/orderSummary';
import './style.scss';

const Payment = () => {
  const { state, handlers } = useContext(CartContext);
  const { confirmOrder, getString } = handlers;
  const navigate = useNavigate();

  if (!state.user) {
    return <></>;
  }

  const initialValues = {
    picked: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    await confirmOrder(values.picked);
    navigate('/ordersuccess');
  };

  return (
    <div className="formik">
      <Formik classname="payment" initialValues={initialValues} onSubmit={submitHandler}>
        {({ values }) => (
          <Form className="payment__f1">
            <h1 className="payment__h1">{getString('titles.choosePayment')}</h1>
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
            <div className="payment__textbutton">{values.picked}</div>

            <Button className="payment__button" type="submit">
              {getString('buttons.confirmPayment')}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="payment__order">
        <OrderSummary className="payment__order__basket" />
      </div>
    </div>
  );
};

export default Payment;
