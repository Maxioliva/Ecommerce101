import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import { getAssetUrl } from '../../../utils/config';
import { Formik, Field, Form } from 'formik';
import { updateBasket } from '../../../utils/resolvers';
import './style.scss';
import OrderSummary from '../../atoms/orderSummary';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/button';
import { Timestamp } from 'firebase/firestore';

const Payment = () => {
  const { user, getOrder, getString, updateBasket } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    return <></>;
  }

  const initialValues = {
    picked: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    const dateInSeconds = Timestamp.fromDate(new Date()).seconds;
    await updateBasket({ userId: user.id, payment: values.picked, isCompleted: true, completedAt: dateInSeconds });
    await getOrder(user.id);
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
