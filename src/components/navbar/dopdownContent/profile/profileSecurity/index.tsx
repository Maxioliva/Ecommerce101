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
    password: userInfo.password,
  };

  const initialValues2 = {
    password: '',
  };

  const initialValues3 = {
    email: '',
  };

  const submitHandler = (values: typeof initialValues) => {
    updateUser(values.firstName, values.lastName, values.email, values.id);
  };
  const submitHandler2 = (values: { password: string }) => {
    changePassword(values.password);
  };

  const submitHandler3 = (values: typeof initialValues) => {
    updateUser(values.firstName, values.lastName, values.email, values.id);
    changeEmail(values.email);
  };

  return (
    <>
      <div>
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
                  <Field
                    disabled="disabled"
                    className="input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                  />
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
        <Formik initialValues={initialValues2} onSubmit={submitHandler2}>
          <Form className="form">
            <Field className="input" type="password" id="password" name="password" placeholder="password" />
            <button className="form__button" type="submit">
              Change password
            </button>
          </Form>
        </Formik>

        <Formik initialValues={initialValues} onSubmit={submitHandler3}>
          <Form className="form">
            <Field className="input" type="text" id="email" name="email" placeholder="email" />
            <button className="form__button" type="submit">
              Change Email
            </button>
          </Form>
        </Formik>
      </div>{' '}
    </>
  );
};

export default ProfileSettings;
