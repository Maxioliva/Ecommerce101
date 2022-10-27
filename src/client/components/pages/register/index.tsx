import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/config';
import { registerUser } from '../../../utils/resolvers';
import { User } from '../../../utils/Type';
import Input from '../../atoms/input';
import './style.scss';

const RegisterForm = () => {
  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  };

  const validate = (values: User & { password: string }) => {
    const error: any = {};
    if (!values.firstName) {
      error.firstName = 'Please insert a firstname';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstName)) {
      error.firstName = 'The name can contain only letters and spaces';
    }

    if (!values.lastName) {
      error.lastName = 'Please insert a lastname';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName)) {
      error.lastName = 'The name can contain only letters and spaces';
    }
    return error;
  };

  const submitHandler = async (values: User & { password: string }) => {
    try {
      await registerUser(values);
    } catch (error) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        console.log(error.message);
        window.alert('Email Already in Use');
      }
      if (error instanceof Error && error.message.includes('weak-password')) {
        console.log(error.message);
        window.alert('Password should be at least 6 characters');
      }
    }
  };

  return (
    <>
      <div className="formik__header">
        <img className="login__logo" src={getAssetUrl('./header/navbarlogo.png')} alt="section1" />
      </div>
      <Formik initialValues={initialValues} validate={validate} onSubmit={submitHandler}>
        {({ errors }) => (
          <Form className="form">
            <div className="sign">Register Account</div>
            <div className="genre">
              <Field name="Genre" as="select">
                <option value="Mrs" id="Mrs">
                  Mrs
                </option>
                <option value="Mr" id="Mr">
                  Mr
                </option>
              </Field>
            </div>
            <Field component={Input} name="firstName" label="First Name" />
            <Field component={Input} name="lastName" label="Last Name" />
            <Field component={Input} name="email" label="Email" type="email" />
            <Field component={Input} name="password" label="Password" type="password" />
            <button className="sign-button" type="submit">
              Register
            </button>
            <div className="form-message">
              By creating an account, you agree to Shopping`s terms of use and privacy notice{' '}
            </div>
          </Form>
        )}
      </Formik>
      <div className="bottom-form">
        <div className="separator-line">¿Do you already have an account?</div>
        <Link to={'/login'}>
          <button className="buttom-register" type="submit">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};
export default RegisterForm;
