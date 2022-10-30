/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { ErrorMessage, FieldProps, getIn } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { getAssetUrl } from '../../../utils/config';
import { getErrorMessage } from '../../../utils/validations';
import './style.scss';

type CustomInputProps = {
  label: string;
};
export type InputProps = CustomInputProps &
  FieldProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ label, field, form, ...rest }: InputProps) => {
  const { errors: formikErrors, touched } = form;
  const isEmpty = (value: any) => value === null || value === undefined || value === '';
  const isTouched = getIn(touched, field.name);
  const errors = isTouched && getIn(formikErrors, field.name);
  const hasError = !!errors?.length;
  const errorMessage = hasError ? getErrorMessage(errors[0], label) : undefined;
  const hasSuccess =
    isTouched && !hasError && !isEmpty(typeof field.value === 'string' ? field.value.trim() : field.value);
  const statusIcon = hasError ? 'error.svg' : hasSuccess ? 'success.svg' : undefined;

  return (
    <>
      <label className="label" htmlFor={field.name}>
        <input
          {...field}
          {...rest}
          style={statusIcon && { backgroundImage: `url('${getAssetUrl(statusIcon)}')` }}
          className={classNames('input', { input__error: hasError })}
          placeholder={label}
        />
        <span className="span">{label}</span>
      </label>
      {hasError && <ErrorMessage name={field.name!} component={() => <div className="error">{errorMessage}</div>} />}
    </>
  );
};

export default Input;
