/* eslint-disable no-unused-expressions */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import './style.scss';

const LoginForm = () => {
  const { login } = useContext(CartContext);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values: { email: string; password: string }) => {
    const error: any = {};
    if (!values.password) {
      error.password = 'Please insert a password';
    }

    if (!values.email) {
      error.email = 'Please insert a email';
    }

    return error;
  };

  const submitHandler = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
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
    <Formik initialValues={initialValues} validate={validate} onSubmit={submitHandler}>
      {({ errors }) => (
        <Form className="form">
          <div className="sign">Sign In</div>
          <div>
            <label htmlFor="email"></label>
            <Field className="input" type="email" id="email" name="email" placeholder="Email Address" />
            <ErrorMessage name="email" component={() => <div className="error">{errors.email} </div>} />
          </div>
          <div>
            <label htmlFor="password"></label>
            <Field className="input" type="password" id="password" name="password" placeholder="Choose a Password" />
            <ErrorMessage name="password" component={() => <div className="error">{errors.password} </div>} />
          </div>
          <div className="button-container">
            <button className="sign-button" type="submit">
              Login
            </button>
          </div>
          <Link to={'/register'}>
            <button type="submit">Register</button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
