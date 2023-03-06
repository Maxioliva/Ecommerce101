import { FieldProps } from 'formik';
import { useState } from 'react';
import { getAssetUrl } from '../../../utils/config';
import './style.scss';

type SelectOptionProps = FieldProps & {
  options: { label: string; value: any; icon?: string }[];
  onSelet: (value: any) => void;
};

const Select = ({ options, field, form }: SelectOptionProps) => {
  const [isOpen, setOpen] = useState(false);

  const onSelectHandler = (value: any) => {
    setOpen(false);
    const optionAlreadySelected = field.value.includes(value);
    const newValue = optionAlreadySelected
      ? [...field.value.filter((o: string) => o !== value)]
      : [...field.value, value];
    form.setFieldValue(field.name, newValue);
  };

  return (
    <div className="select">
      <div className="select__control" onClick={() => setOpen(!isOpen)}>
        {field.name}
      </div>
      {isOpen && (
        <div className="select__options">
          {options.map(o => (
            <div key={o.value} className="select__option" onClick={() => onSelectHandler(o.value)}>
              {o.label}
              {field.value.includes(o.value) && (
                <img className="select__img" src={getAssetUrl('success.svg')} alt="checked" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
