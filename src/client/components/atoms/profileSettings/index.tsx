import { Field, Form, Formik } from 'formik';
import isEmpty from 'lodash.isempty';
import { useContext } from 'react';
import { updateUser } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { runValidation } from '../../../utils/validations';
import Input from '../input';
import './style.scss';

const ProfileSettings = () => {
  const { user, changePassword, changeEmail } = useContext(CartContext);

  if (!user) {
    return <></>;
  }

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user.id,
    password: '',
  };

  const submitHandlerPosta = (values: typeof initialValues) => {
    updateUser(values.firstName, values.lastName, values.email, values.id);
    changeEmail(values.email);
    changePassword(values.password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandlerPosta}>
      {({ errors }) => (
        <Form className="form">
          <div className="sign"> Personal Data </div>
          <Field
            component={Input}
            name="firstName"
            label="First Name"
            validate={(value: string) => runValidation(value, 'firstName')}
          />

          <Field
            component={Input}
            name="lastName"
            label="Last Name"
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
            label="Password"
            type="password"
            validate={(value: string) => runValidation(value, 'password')}
          />
          <button className="sign-button" type="submit" disabled={!isEmpty(errors)}>
            Update
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileSettings;
