/* eslint-disable no-shadow */
import React, { useContext, useState } from 'react';
import CartContext from '../../../utils/StateContext';

type SelectOption = {
  label: 'colors' | 'categories';
};

const SelectBox: React.FC<SelectOption> = ({ label }) => {
  const { selectState, colors } = useContext(CartContext);

  const colorOptions = {
    options: ['red', 'blue', 'black'],
  };

  const categorieOptions = {
    options: ['male', 'female'],
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
        {label === 'categories' &&
          categorieOptions.options.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectBox;

// {options.map(({ value, label }) => (
//   <div key={value}>{label[0]}</div>
// ))}
