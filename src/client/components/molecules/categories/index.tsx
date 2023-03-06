import classNames from 'classnames';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';

import './style.scss';

export type Category = { name: string; subcategories?: Category[] };
export const categories03: Category[] = [
  {
    name: 'womens',
    subcategories: [
      { name: 'tops' },
      { name: 'dresses' },
      { name: 'shoes' },
      { name: 'bags' },
      { name: 'jewellery' },
      { name: 'watches' },
      { name: 'skincare' },
      { name: 'fragrances' },
    ],
  },
  {
    name: 'mens',
    subcategories: [
      {
        name: 'shirts',
      },
      { name: 'shoes' },
      { name: 'watches' },
      { name: 'sunglasses' },
    ],
  },
  {
    name: 'home',
    subcategories: [{ name: 'decoration' }, { name: 'furniture' }, { name: 'lighting' }],
  },
  { name: 'tech', subcategories: [{ name: 'smartphones' }, { name: 'laptops' }] },
  { name: 'automotive', subcategories: [{ name: 'automotive' }, { name: 'motorcycle' }] },
  { name: 'groceries' },
];

type categoriesProps = {
  className?: string;
};

type CategoryItemProps = {
  name: string;
  path?: string;
  onClick?: (value: string) => void;
};

const Categories = (props: categoriesProps) => {
  const { handlerCategories } = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState<string>();
  const navigate = useNavigate();

  const onClikCartegory = async (path: string) => {
    await handlerCategories(path);
    navigate('/Products');
  };

  return (
    <div className="categories">
      <div className="categories__primary">
        {categories03.map(({ name, subcategories }) => (
          <div
            key={name}
            onMouseEnter={() => setActiveCategory(name)}
            onMouseLeave={() => setActiveCategory(undefined)}
          >
            <div className="categories__category" onClick={() => !subcategories && onClikCartegory(name)}>
              {name}
            </div>
            <div
              className={classNames('categories__secondary', {
                'categories__secondary--selected': activeCategory === name,
              })}
            >
              {subcategories?.map(({ name: subcategoryName }: CategoryItemProps) => (
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
      </div>
    </div>
  );
};

export default Categories;
