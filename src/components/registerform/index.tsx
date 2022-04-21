import { Formik, Form, Field, ErrorMessage } from 'formik';
import './style.scss';
// import { registerUser, login } from '../../utils/resolvers';
// import { Authentication } from '../../pages/Authentication';

const RegisterForm = () => (
  <Formik
    initialValues={{
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      Genre: '',
    }}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    validate={values => {
      const error: any = {};
      if (!values.firstname) {
        error.firstname = 'Please insert a firstname';
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstname)) {
        error.firstname = 'The name can contain only letters and spaces';
      }

      if (!values.lastname) {
        error.lastname = 'Please insert a lastname';
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
        error.lastname = 'The name can contain only letters and spaces';
      }
      return error;
    }}
    //  onSubmit = { (values) => registerUser(values)
    //  }

    onSubmit={values => {
      console.log(values);
    }}
  >
    {({ errors }) => (
      // {({ values, handleChange, handleBlur, errors })
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
          <label htmlFor="firstname"></label>
          <Field className="input" type="text" id="firstname" name="firstname" placeholder="First Name" />
          <ErrorMessage name="firstname" component={() => <div className="error">{errors.firstname} </div>} />
        </div>
        <div>
          <label htmlFor="lastname"></label>
          <Field className="input" type="text" id="lastname" name="lastname" placeholder="Last Name" />
          <ErrorMessage name="lastname" component={() => <div className="error">{errors.lastname} </div>} />
        </div>
        <div>
          <label htmlFor="email"></label>
          <Field className="input" type="email" id="email" name="email" placeholder="Email Address" />
        </div>
        <div>
          <label htmlFor="password"></label>
          <Field className="input" type="password" id="password" name="password" placeholder="Choose a Password" />
        </div>
        <button type="submit">Register Now</button>
      </Form>
    )}
  </Formik>
);

export default RegisterForm;
