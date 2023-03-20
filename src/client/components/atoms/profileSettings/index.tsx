import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import { runValidation } from '../../../utils/validations';
import Button from '../button';
import Input from '../input';
import './style.scss';

const ProfileSettings = () => {
  const { state, handlers } = useContext(CartContext);
  const { user } = state;
  const { updateUserData } = handlers;

  if (!user) {
    return <></>;
  }

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      await updateUserData(values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
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
          <Button type="submit">Update</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileSettings;
