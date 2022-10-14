import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';
import { getAssetUrl } from '../../../utils/config';
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
    <>
      <Formik initialValues={initialValues} validate={validate} onSubmit={submitHandler}>
        {({ errors }) => (
          <>
            <div className="formik__header">
              <img className="login__logo" src={getAssetUrl('./header/navbarlogo.png')} alt="section1" />
            </div>
            <Form className="form">
              <div className="sign">Sign In</div>
              <label htmlFor="email"></label>
              <Field className="input" type="email" id="email" name="email" placeholder="Email Address" />
              <ErrorMessage name="email" component={() => <div className="error">{errors.email} </div>} />
              <label htmlFor="password"></label>
              <Field className="input" type="password" id="password" name="password" placeholder="Choose a Password" />
              <ErrorMessage name="password" component={() => <div className="error">{errors.password} </div>} />
              <div className="button-container">
                <button className="sign-button" type="submit">
                  Login
                </button>
              </div>
              <div className="form-message">
                By continuing, you agree to the shopping terms and conditions and privacy notice .
              </div>
            </Form>
          </>
        )}
      </Formik>
      <div className="bottom-form">
        <div className="separator-line">¿Are you new in Shopping?</div>

        <Link to={'/register'}>
          <button className="buttom-register" type="submit">
            Register
          </button>
        </Link>
      </div>
    </>
  );
};
export default LoginForm;
