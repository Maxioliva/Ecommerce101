import classNames from 'classnames';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../utils/StateContext';

import './style.scss';

export type Category = { name: string; path?: string; subcategories?: Omit<Category, 'subcategories'>[] };

export const categories03: Category[] = [
  {
    name: 'womens',
    subcategories: [
      { name: 'tops' },
      { name: 'dresses', path: 'womens-dresses' },
      { name: 'shoes', path: 'womens-shoes' },
      { name: 'bags', path: 'womens-bags' },
      { name: 'jewellery', path: 'womens-jewellery' },
      { name: 'watches', path: 'womens-watches' },
      { name: 'skincare' },
      { name: 'fragrances' },
    ],
  },
  {
    name: 'mens',
    subcategories: [
      {
        name: 'shirts',
        path: 'mens-shirts',
      },
      { name: 'shoes', path: 'mens-shoes' },
      { name: 'watches', path: 'mens-watches' },
      { name: 'sunglasses' },
    ],
  },
  {
    name: 'home',
    subcategories: [{ name: 'decoration', path: 'home-decoration' }, { name: 'furniture' }, { name: 'lighting' }],
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
        {categories03.map(({ name, subcategories, path }) => (
          <div
            key={name}
            onMouseEnter={() => setActiveCategory(name)}
            onMouseLeave={() => setActiveCategory(undefined)}
          >
            <div className="categories__category" onClick={() => !subcategories && onClikCartegory(path ?? name)}>
              {name}
            </div>
            <div
              className={classNames('categories__secondary', {
                'categories__secondary--selected': activeCategory === name,
              })}
            >
              {subcategories?.map(({ name, path }: CategoryItemProps) => (
                <div className="categories__category" key={name} onClick={() => onClikCartegory(path ?? name)}>
                  {name}
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
