import classNames from 'classnames';
import { useState } from 'react';
import { getAssetUrl } from '../../../utils/config';
import './style.scss';

type Category = { name: string; subcategories?: string[] };

const categories03: Category[] = [
  {
    name: 'womens',
    subcategories: ['tops', 'dresses', 'shoes', 'bags', 'jewellery', 'watches', 'skincare', 'fragrances'],
  },
  { name: 'mens', subcategories: ['shirts', 'shoes', 'watches', 'sunglasses'] },
  { name: 'home', subcategories: ['home-decoration', 'furniture', 'lighting'] },
  { name: 'tech', subcategories: ['smartphones', 'laptops'] },
  { name: 'automotive', subcategories: ['automotive', 'motorcycle'] },
  { name: 'groceries' },
];

type categoriesProps = {
  control?: 'womens' | 'mens' | 'home' | 'tech' | 'automotive' | 'groceries';
  className?: string;
};

type CategoryItemProps = {
  name: string;
};

const CategoryItem = ({ name }: CategoryItemProps) => <div className="categories__category">{name}</div>;

const Categories = (props: categoriesProps) => {
  const [activeCategory, setActiveCategory] = useState<string>();

  console.log('activeCategory ', activeCategory);

  return (
    <div className="categories">
      <div className="categories__primary">
        {categories03.map(({ name, subcategories }) => (
          <div
            key={name}
            onMouseEnter={() => setActiveCategory(name)}
            onMouseLeave={() => setActiveCategory(undefined)}
          >
            <div className="categories__category">{name}</div>
            <div
              className={classNames('categories__secondary', {
                'categories__secondary--selected': activeCategory === name,
              })}
            >
              {subcategories?.map((sub: string) => (
                <CategoryItem key={sub} name={sub} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
