import { useState, useEffect, useMemo } from 'react';
import styles from 'components/input/style.module.scss';

interface UseInputProps {
  type?: string;
  name: string;
  value: any;
  errorMsg?: string;
  valErrorMsg?: string;
  required?: boolean;
  handleChange?: (event: any, error?: any) => void;
  open?: boolean;
  errors?: any;
  inputCon?: any;
}

interface UseInputReturn {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  errorMessage: string | undefined | null;
  internalValue: string;
  typing: boolean;
  setTyping: (value: boolean) => void;
  inputInternalError: boolean | undefined;
  error: boolean;
  isPhoneNumber: boolean;
  setPhoneExtValue: () => void;
  choosePhoneExt: (event: any) => void;
  validateOne: (event: any) => void;
}

export const useInput = ({
  type = 'text',
  name,
  value,
  valErrorMsg = '',
  errorMsg,
  required = false,
  handleChange = () => {
    return;
  },
  open = false,
  errors,
  inputCon,
}: UseInputProps): UseInputReturn => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined | null>(
    valErrorMsg
  );
  const [internalValue, setInternalValue] = useState(value);
  const [typing, setTyping] = useState(false);
  const [inputInternalError, setInternalError] = useState<boolean>();
  const [ext, setPhoneEst] = useState('234');

  const error = useMemo(
    () => (typeof errors?.[name] !== 'string' && errors?.[name] ? true : false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors?.[name]]
  );
  const submitted = useMemo(() => errors?.onSubmit, [errors?.onSubmit]);

  useEffect(() => {
    if (value && type === 'phone') {
      setPhoneExtValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (internalValue === '' || !internalValue) {
      if ((submitted && required) || (error && required)) {
        setInternalError(true);

        inputCon?.current?.classList.add(styles['invalid']);
        setErrorMessage(errorMsg);
      }

      if (errors?.reset) {
        inputCon?.current?.classList.remove(styles['invalid']);
        setInternalError(false);
      }

      inputCon?.current?.classList.remove(styles['typing']);
      inputCon?.current?.classList.remove(styles['valid']);
    } else {
      setInternalError(false);
      inputCon?.current?.classList.add(styles['typing']);

      if (error) {
        inputCon?.current?.classList.add(styles['invalid']);
        inputCon?.current?.classList.remove(styles['valid']);
        setErrorMessage(valErrorMsg);
      } else {
        inputCon?.current?.classList.add(styles['valid']);
        inputCon?.current?.classList.remove(styles['invalid']);
        setErrorMessage(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, error, internalValue, submitted, errors?.reset]);

  function addCommas(x: string) {
    x = x.split(',').join('');

    if (x === '') return '';
    if (!Number(x)) return value;

    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  const isPhoneNumber = type.includes('phone');

  const validateOne = (event: any) => {
    if (type === 'formattednumber') {
      event.target.value = addCommas(event.target.value);
    }

    handleChange(event, error);
    setInternalValue(event.target.value);
  };

  const choosePhoneExt = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setPhoneEst(value);
    setPhoneExtValue(value);
  };

  const setPhoneExtValue = (extension?: string) => {
    const newExtension = extension || ext;

    let newValue = value;

    if (value[0] === '0') {
      newValue = value.slice(1);
    }

    if (value[0] === '(') {
      newValue = value.split('- ')[1];
    }

    if (!newValue) return;

    const phone = `(${newExtension}) - ${newValue}`;

    setInternalValue(phone);
    handleChange({ target: { name, value: phone } });
  };

  return {
    setShowPassword,
    showPassword,
    errorMessage,
    internalValue,
    typing,
    setTyping,
    inputInternalError,
    choosePhoneExt,
    validateOne,
    setPhoneExtValue,
    isPhoneNumber,
    error,
  };
};
