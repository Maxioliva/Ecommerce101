type InputType =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'street'
  | 'houseNumber'
  | 'zipCode'
  | 'city'
  | 'country';

type ErrorKey = 'isRequired' | 'minLength' | 'maxLength' | 'invalid';

type ValidationOptions = {
  minLength: number;
  maxLength: number;
  isRequired?: boolean;
  format?: string;
};

const validationRules: { [key: string]: ValidationOptions } = {
  firstName: { minLength: 2, maxLength: 25, isRequired: true, format: '^[a-zA-ZÀ-ÿ\\s]{2,25}$' },
  lastName: { minLength: 2, maxLength: 25, isRequired: true, format: '^[a-zA-ZÀ-ÿ\\s]{2,25}$' },
  email: { minLength: 6, maxLength: 35, isRequired: true, format: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$' },
  password: { minLength: 8, maxLength: 25, isRequired: true, format: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$' },
  street: { minLength: 2, maxLength: 25, isRequired: true, format: '^(\\d|\\w| )*$' },
  houseNumber: { minLength: 1, maxLength: 5, isRequired: false, format: '^(\\d){1,5}$' },
  zipCode: { minLength: 3, maxLength: 10, isRequired: true, format: '^(\\d){3,10}$' },
  city: { minLength: 2, maxLength: 15, isRequired: true, format: '^(\\D| )*$' },
  country: { minLength: 2, maxLength: 15, isRequired: true, format: '^(\\D| )*$' },
};

export const runValidation = (value: string, name: InputType) => {
  const error: string[] = [];
  const { minLength, maxLength, isRequired, format } = validationRules[name];

  if (!value && isRequired) {
    error.push('isRequired');
  }

  if (minLength > value.length) {
    error.push('minLength');
  }

  if (maxLength < value.length) {
    error.push('maxLength');
  }

  if (format && !new RegExp(format).test(value)) {
    error.push('invalid');
  }

  return error.length ? error : undefined;
};

const errorMessages = {
  isRequired: (label: string) => `${label} is required`,
  minLength: (label: string) => `${label} is too short`,
  maxLength: (label: string) => `${label} is too long`,
  invalid: (label: string) => `${label} is invalid`,
};

export const getErrorMessage = (errorKey: ErrorKey, label?: any) => errorMessages[errorKey](label);
// Password format: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
// (?=.*?[A-Z]) -- At least 1 uppercase letter A-Z
// (?=.*?[a-z]) -- At least 1 lowercase letter a-z
// (?=.*?[0-9]) -- At least 1 digit integer 0-9
// (?=.*?[#?!@$%^&*-]) -- At least 1 symbol #?!@$%^&*-
// .{8,} -- At least 8 characters
