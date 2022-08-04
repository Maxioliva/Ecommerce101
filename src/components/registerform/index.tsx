import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { registerUser } from '../../utils/resolvers';
import { User } from '../../utils/Type';
import './style.scss';

const RegisterForm = () => {
  const initialValues: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  };

  const validate = (values: User) => {
    const error: any = {};
    if (!values.firstName) {
      error.firstName = 'Please insert a firstname';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstName)) {
      error.firstName = 'The name can contain only letters and spaces';
    }

    if (!values.lastName) {
      error.lastname = 'Please insert a lastname';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName)) {
      error.lastname = 'The name can contain only letters and spaces';
    }
    return error;
  };

  const submitHandler = (values: User) => {
    try {
      registerUser(values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={submitHandler}>
      {({ errors }) => (
        <Form className="form">
          <div>
            <Field name="Genre" as="select">
              <option value="Mrs" id="Mrs">
                Mrs
              </option>
              <option value="Mr" id="Mr">
                Mr
              </option>
            </Field>
          </div>
          <div>
            <label htmlFor="firstName"></label>
            <Field className="input" type="text" id="firstName" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component={() => <div className="error">{errors.firstName} </div>} />
          </div>
          <div>
            <label htmlFor="lastName"></label>
            <Field className="input" type="text" id="lastName" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component={() => <div className="error">{errors.lastName} </div>} />
          </div>
          <div>
            <label htmlFor="email"></label>
            <Field className="input" type="email" id="email" name="email" placeholder="Email Address" />
          </div>
          <div>
            <label htmlFor="password"></label>
            <Field className="input" type="password" id="password" name="password" placeholder="Choose a Password" />
          </div>
          <button className="sign-button" type="submit">
            Register
          </button>
          <Link to={'/login'}>
            <button type="submit">Login</button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterForm;
