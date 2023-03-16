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
    ownerId: user?.uid,
    title: '',
    description: '',
    price: '',
    brand: '',
    stock: 1,
    colors: [] as string[],
    categories: [] as string[],
    images: [] as string[],
  };
  const submitHandler = async (values: typeof initialValues) => {
    await uploadProduct(values);
    navigate('/saleSuccess');
  };

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
          <Form className="sellProduct__form">
            <div className="sellProduct__title"> Vende tu producto </div>
            <Field
              className="sellProduct__fields"
              component={Input}
              name="title"
              label="Title of Product"
              validate={(value: string) => runValidation(value, 'title')}
            />
            <Field
              className="sellProduct__fields"
              component={Input}
              name="images"
              label="URl Images"
              validate={(value: string) => runValidation(value, 'urlImg')}
            />
            <Field
              className="sellProduct__fields"
              component={Input}
              name="description"
              label="Description"
              validate={(value: string) => runValidation(value, 'description')}
            />
            <Field
              className="sellProduct__fields"
              component={Input}
              name="brand"
              label="Brand"
              validate={(value: string) => runValidation(value, 'brand')}
            />

            <Field
              className="sellProduct__fields"
              component={Input}
              name="price"
              label="Price"
              validate={(value: string) => runValidation(value, 'price')}
            />
            <Field
              className="sellProduct__fields"
              component={Input}
              name="stock"
              label="Stock"
              type="number"
              max="10"
              min="1"
            />
            <div className="sellProduct__filters">
              <span className="sellProduct__filters-span">Filters:</span>
              <Field
                className="sellProduct__fields"
                component={Select}
                name="colors"
                label="Colors"
                options={colorOptions}
              />
              <Field
                className="sellProduct__fields"
                component={Select}
                name="categories"
                label="Categories"
                options={categories03}
              />
            </div>
            <Button type="submit">Update</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SellProduct;
