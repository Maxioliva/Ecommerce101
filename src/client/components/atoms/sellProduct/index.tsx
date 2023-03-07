import { Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProduct } from '../../../utils/resolvers';
import CartContext from '../../../utils/StateContext';
import { runValidation } from '../../../utils/validations';
import { categories03 } from '../../molecules/categories';
import Button from '../button';
import Input from '../input';
import Select from '../select';
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
    colors: [] as string[],
    categories: [] as string[],
    images: [] as string[],
  };
  const submitHandler = async (values: typeof initialValues) => {
    //aa van la ejecucion de los resolvers
    await uploadProduct(values);
  };

  // useEffect(() => {
  //   (async () => {
  //     const newProduct: Omit<SellerProduct, 'id'> = {s
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

  const colorOptions = [
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Black', value: 'Black' },
    { label: 'Yellow', value: 'Yellow' },
    { label: 'White', value: 'White' },
    { label: 'Green', value: 'Green' },
    { label: 'Violet', value: 'Violet' },
    { label: 'Orange', value: 'Orange' },
  ];

  return (
    <div className="sellProduct">
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        {({ errors }) => (
          <Form className="form">
            <div className="sign"> Vende tu producto </div>
            <Field component={Select} name="colors" label="Colors" options={colorOptions} />
            <Field component={Select} name="categories" label="Categories" options={categories03} />
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
