/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import CartContext from '../../../utils/StateContext';
import { categories03 } from '../../molecules/categories/index';

type SelectOption = {
  label: 'colors' | 'categories';
};

const SelectBox: React.FC<SelectOption> = ({ label }) => {
  const { selectState, colors } = useContext(CartContext);

  const colorOptions = {
    options: ['Red', 'Blue', 'Black', 'Yellow', 'White', 'Green', 'Violet', 'Orange'],
  };

  return (
    <div>
      <select value={colors} onChange={e => selectState(e.target.value)}>
        <option>Select an option</option>
        {label === 'colors' &&
          colorOptions.options.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        {label === 'categories' && categories03.map(({ name, subcategories }) => <option key={name}>{name}</option>)}
      </select>
    </div>
  );
};

export default SelectBox;
