/* eslint-disable no-shadow */
import { ChangeEvent } from 'react';

type SelectOption = {
  label: ['man', 'woman'];
  value: string;
};

type Props = {
  value?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectBox = ({ value, label, disabled, className, options, onChange }: Props) => {
  const Box = (
    <select className={className} disabled={disabled} onChange={onChange} value={value}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label[0]}
        </option>
      ))}
    </select>
  );

  return Box;
  // const result = label ? (
  //   <Label>
  //     <div className={styles.Label}>{label}</div>
  //     {selectBox}
  //   </Label>
  // ) : (
  //   selectBox
  // );

  // return <div className={styles.SelectBox}>{result}</div>;
};

export type { SelectOption };
export default SelectBox;
