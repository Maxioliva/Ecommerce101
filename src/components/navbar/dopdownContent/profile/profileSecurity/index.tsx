import { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ProfileDropDown from '..';
import CartContext from '../../../../../context/CartContext';
import './style.scss';
import { updateUser } from '../../../../../utils/resolvers';

const ProfileSettings = () => {
  const { userInfo } = useContext(CartContext);
  console.log(userInfo);
  const initialValues = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    id: userInfo?.id,
    password: '',
  };

  const submitHandler = (values: any) => {
    updateUser(values.firstName, values.lastName, values.email, values.id);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {() =>
        userInfo ? (
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
            <button className="form__button" type="submit">
              Update info
            </button>
          </Form>
        ) : (
          'please Log in'
        )
      }
    </Formik>
  );
};

export default ProfileSettings;
