import { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import CartContext from '../../../utils/StateContext';
import './style.scss';
import { updateUser } from '../../../utils/resolvers';

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
      <Form className="form">
        <div className="sign"> Personal Data </div>
        <div>
          <Field className="input" type="text" id="firstName" name="firstName" placeholder="First Name" />
        </div>
        <div>
          <label htmlFor="lastName"></label>
          <Field className="input" type="text" id="lastName" name="lastName" placeholder="Last Name" />
        </div>
        <div>
          <Field className="input" type="text" id="email" name="email" placeholder="Email Address" />
        </div>
        <div>
          <Field className="input" type="password" id="password" name="password" placeholder="password" />
        </div>
        <button className="sign-button" type="submit">
          Update
        </button>
      </Form>
    </Formik>
  );
};

export default ProfileSettings;
