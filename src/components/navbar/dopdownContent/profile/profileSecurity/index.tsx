import { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ProfileDropDown from '..';
import CartContext from '../../../../../context/CartContext';
import './style.scss';
import { updateUser } from '../../../../../utils/resolvers';
import { User } from '../../../../../utils/Type';

const ProfileSettings = () => {
  const { userInfo } = useContext(CartContext);
  const initialValues = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    id: userInfo?.id,
  };

  const submitHandler = (values: any) => {
    console.log(userInfo);
    updateUser(values.email, values.firstName, values.lastName, values.userId);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {() => (
        <Form className="form">
          <div>
            <Field className="input" type="text" id="firstName" name="firstName" placeholder="First Name" />
          </div>
          <div>
            <label htmlFor="lastName"></label>
            <Field className="input" type="text" id="lastName" name="lastName" placeholder="Last Name" />
          </div>
          <div>
            <Field className="input" type="email" id="email" name="email" placeholder="Email Address" />
          </div>
          <button className="sign-button" type="submit">
            Change Info
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileSettings;
