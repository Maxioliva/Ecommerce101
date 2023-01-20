import { Field, Form, Formik } from 'formik';
import isEmpty from 'lodash.isempty';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { User } from '../../../utils/Type';
import { runValidation } from '../../../utils/validations';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Logo from '../../atoms/logo';
import './style.scss';

const RegisterForm = () => {
  const { user, getString } = useContext(CartContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/');
  }

  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
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
    <div className="register">
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        {({ errors }) => (
          <>
            <Form className="form">
              <div className="sign">{getString('speech.registerAccout')}</div>
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
              <Field
                component={Input}
                name="firstName"
                label={getString('payment.firstName')}
                validate={(value: string) => runValidation(value, 'firstName')}
              />
              <Field
                component={Input}
                name="lastName"
                label={getString('payment.lastName')}
                validate={(value: string) => runValidation(value, 'lastName')}
              />
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

              <Button type="submit"> {getString('buttons.register')}</Button>
              <div className="form-message">{getString('speech.termsAcepted')}</div>
            </Form>
          </>
        )}
      </Formik>
      <div className="bottom-form">
        <div className="separator-line">{getString('speech.registerAnswer')}</div>
        <Button onClick={() => navigate('/login')}>{getString('links.login')}</Button>
      </div>
    </div>
  );
};
export default RegisterForm;
