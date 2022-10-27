/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.scss';
import { ErrorMessage, FieldProps, getIn } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { getAssetUrl } from '../../../utils/config';

type CustomInputProps = {
  label: string;
};
export type InputProps = CustomInputProps &
  FieldProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ label, field, form, ...rest }: InputProps) => {
  const { errors, touched } = form;
  const isEmpty = (value: any) => value === null || value === undefined || value === '';
  const isTouched = getIn(touched, field.name);
  const error = isTouched && getIn(errors, field.name);
  const hasSuccess =
    isTouched && !error && !isEmpty(typeof field.value === 'string' ? field.value.trim() : field.value);
  const statusIcon = error ? 'error.svg' : hasSuccess ? 'success.svg' : undefined;
  const labelInput = error && hasSuccess && isTouched;
  return (
    <>
      <label className="label" htmlFor={field.name}>
        <input
          {...field}
          {...rest}
          style={statusIcon && { backgroundImage: `url('${getAssetUrl(statusIcon)}')` }}
          className={classNames('input', { input__error: error })}
          placeholder="vevo"
        />
        <span className="span">{label}</span>
      </label>
      <ErrorMessage name={field.name!} component={() => <div className="error">{errors[field.name!]}</div>} />
    </>
  );
};

export default Input;
