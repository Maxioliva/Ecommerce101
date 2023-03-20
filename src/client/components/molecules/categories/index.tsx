import classNames from 'classnames';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';

import './style.scss';

export type Category = { label: string; value: string; subcategories?: Category[] };
export const categories03: Category[] = [
  {
    label: 'Womens',
    value: 'Womens',
    subcategories: [
      { value: 'Tops', label: 'tops' },
      { value: 'Dresses', label: 'dresses' },
      { value: 'Shoes', label: 'shoes' },
      { value: 'Bags', label: 'bags' },
      { value: 'Jewellery', label: 'jewellery' },
      { value: 'Watches', label: 'watches' },
      { value: 'Skincare', label: 'skincare' },
      { value: 'Fragances', label: 'fragrances' },
    ],
  },
  {
    label: 'mens',
    value: 'mens',
    subcategories: [
      {
        value: 'Shirts',
        label: 'shirts',
      },
      { value: 'Shoes', label: 'shoes' },
      { value: 'Waches', label: 'watches' },
      { value: 'Sunglasses', label: 'sunglasses' },
    ],
  },
  {
    label: 'Home',
    value: 'Home',
    subcategories: [
      { label: 'decoration', value: 'Decoration' },
      { label: 'furniture', value: 'Furniture' },
      { label: 'lighting', value: 'lighting' },
    ],
  },
  {
    label: 'tech',
    value: 'Tech',
    subcategories: [
      { label: 'smartphones', value: 'Smartphone' },
      { label: 'laptops', value: 'Laptops' },
    ],
  },
  {
    label: 'automotive',
    value: 'Automotive',
    subcategories: [
      { label: 'automotive', value: 'Automotive' },
      { label: 'motorcycle', value: 'Motorcycle' },
    ],
  },
  { label: 'groceries', value: 'Groceries' },
];

type categoriesProps = {
  className?: string;
};

type CategoryItemProps = {
  label: string;
  path?: string;
  onClick?: (value: string) => void;
};

const Categories = (props: categoriesProps) => {
  // const { handlerCategories } = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState<string>();
  const navigate = useNavigate();

  // const onClikCartegory = async (value: string) => {
  //   await handlerCategories(value);
  //   navigate('/Products');
  // };

  return (
    <div className="categories">
      {/* <div className="categories__primary">
        {categories03.map(({ label, subcategories }) => (
          <div
            key={label}
            onMouseEnter={() => setActiveCategory(label)}
            onMouseLeave={() => setActiveCategory(undefined)}
          >
            <div className="categories__category" onClick={() => !subcategories && onClikCartegory(label)}>
              {label}
            </div>
            <div
              className={classNames('categories__secondary', {
                'categories__secondary--selected': activeCategory === label,
              })}
            >
              {subcategories?.map(({ label: subcategoryName }: CategoryItemProps) => (
                <div
                  className="categories__category"
                  key={subcategoryName}
                  onClick={() => onClikCartegory(subcategoryName)}
                >
                  {subcategoryName}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Categories;
