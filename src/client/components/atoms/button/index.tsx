import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import LoadingDots from '../loadingDots';
import './style.scss';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  isLoading?: boolean;
  isSecondary?: boolean;
  isTertiary?: boolean;
  className?: string;
};

const Button = ({ className, isLoading, isSecondary, isTertiary, ...props }: ButtonProps) => {
  const dynamicClasses = {
    'button--isLoading': isLoading,
    'button--isSecondary': isSecondary,
    'button--isTertiary': isTertiary,
  };

  return (
    <button className={classNames('button', dynamicClasses, className)} {...props}>
      {isLoading ? <LoadingDots /> : <div className="Button">{props.children}</div>}
    </button>
  );
};

export default Button;
