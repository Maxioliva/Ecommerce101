import { Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import { runValidation } from '../../../utils/validations';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Logo from '../../atoms/logo';
import './style.scss';

const LoginForm = () => {
  const { state, handlers } = useContext(CartContext);
  const { user } = state;
  const { getString, login } = handlers;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const initialValues = {
    email: '',
    password: '',
  };

  const submitHandler = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error && error.message.includes('auth/wrong-password')) {
        console.log(error.message);
        window.alert('wrong password');
      }
      if (error instanceof Error && error.message.includes('auth/user-not-found')) {
        console.log(error.message);
        window.alert('user not found');
      }
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <>
          <div className="formik__header">
            <Logo secondary />
          </div>
          <Form className="form">
            <div className="sign">{getString('speech.singIn')}</div>
            <Field
              component={Input}
              name="email"
              label="Email"
              type="email"
              validate={(value: string) => runValidation(value, 'email')}
            />
            <Field
              component={Input}
              name="password"
              label={getString('payment.password')}
              type="password"
              validate={(value: string) => runValidation(value, 'password')}
            />
            <div className="button-container">
              <Button type="submit">{getString('buttons.login')}</Button>
            </div>
            <div className="form-message">{getString('speech.byContinuing')}</div>
          </Form>
        </>
      </Formik>
      <div className="bottom-form">
        <div className="separator-line">{getString('speech.newUser')}</div>
        <Button className="buttom-register" onClick={() => navigate('/register')}>
          {getString('buttons.register')}
        </Button>
      </div>
    </>
  );
};
export default LoginForm;
