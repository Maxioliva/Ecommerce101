import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProduct } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { SellerProduct } from '../../../utils/Type';
import { runValidation } from '../../../utils/validations';
import Button from '../button';
import Input from '../input';
import SelectBox from '../select';
import './style.scss';

const SellProduct = () => {
  const { user } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  if (!user) {
    navigate('/');
  }

  const initialValues = {
    ownerId: user?.id,
    title: '',
    description: '',
    price: '',
    brand: '',
    color: [],
    categories: [],
    images: [],
  };

  const submitHandler = async (values: Omit<SellerProduct, 'id'>) => {
    //aa van la ejecucion de los resolvers

    await uploadProduct(values);
  };

  // useEffect(() => {
  //   (async () => {
  //     const newProduct: Omit<SellerProduct, 'id'> = {
  //       ownerId: user!.id,
  //       title: value.title,
  //       description: 'aca esta chomaba del celeste aniversario de 100 años',
  //       price: 123,
  //       brand: 'belgrano SR',
  //       color: ['red', 'blac', 'blue'],
  //       categories: ['woman', 'man'],
  //       images: ['imagen 1', 'imagen 2'],
  //     };
  //     await uploadProduct(newProduct);
  //   })();
  // }, []);

  return (
    <div className="sellProduct">
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        {({ errors }) => (
          <Form className="form">
            <div className="sign"> Vende tu producto </div>
            <Field
              component={Input}
              name="title"
              label="Title of Product"
              validate={(value: string) => runValidation(value, 'title')}
            />
            <Field
              component={Input}
              name="images"
              label="URl Images"
              validate={(value: string) => runValidation(value, 'urlImg')}
            />
            <Field
              component={Input}
              name="description"
              label="Description"
              validate={(value: string) => runValidation(value, 'description')}
            />
            <Field
              component={Input}
              name="brand"
              label="Brand"
              validate={(value: string) => runValidation(value, 'brand')}
            />
            <SelectBox label={'colors'} />
            <SelectBox label={'categories'} />
            <Field
              component={Input}
              name="price"
              label="Price"
              validate={(value: string) => runValidation(value, 'price')}
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SellProduct;
