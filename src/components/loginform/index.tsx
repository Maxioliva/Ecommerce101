/* eslint-disable no-unused-expressions */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../utils/resolvers';
import { User } from '../../utils/Type';
import './style.scss';

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  };

  const validate = (values: User) => {
    const error: any = {};
    if (!values.password) {
      error.password = 'Please insert a password';
    }

    if (!values.email) {
      error.email = 'Please insert a email';
    }

    return error;
  };

  const submitHandler = (values: User) => {
    try {
      login(values.email, values.password);
      navigate('/');
    } catch (error) {
      console.log(error);
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
