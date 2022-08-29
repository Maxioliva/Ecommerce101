import { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import CartContext from '../../../../../context/CartContext';
import './style.scss';
import { updateUser } from '../../../../../utils/resolvers';

const ProfileSettings = () => {
  const { userInfo, changePassword, changeEmail } = useContext(CartContext);

  if (!userInfo) {
    return <></>;
  }

  const initialValues = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    id: userInfo.id,
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
        <div className="form__title"> Personal Data </div>
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
        <button className="form__button" type="submit">
          Update info
        </button>
      </Form>
    </Formik>
  );
};

export default ProfileSettings;
