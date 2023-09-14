import { useEffect, useMemo, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { validate } from 'utils/helpers';

interface useInputProps {
  inputs: any;
  submitButton: any;
  cb: any;
  validateForm?: boolean;
  initials?: any;
  formRef?: any;
}

interface returnTypeProps {
  handleSubmit: any;
  handleChange: any;
  inputTypes: any;
  errors: any;
  setInputTypes: any;
  loading: any;
  resetInputs: any;
}

export const useForm = ({
  inputs,
  submitButton,
  cb,
  validateForm = true,
  initials = {},
  formRef,
}: useInputProps): returnTypeProps => {
  const initialInputs = useMemo(
    () =>
      inputs?.reduce(
        (acc: any, input: any) => ({
          ...acc,
          [input.name]: initials[input.name] ? initials[input.name] : '',
        }),
        {}
      ),
    [inputs, initials]
  );

  const initialError = useMemo(
    () =>
      inputs?.reduce(
        (acc: any, input: any) => ({
          ...acc,
          [input.name]: initials[input.name] ? false : '',
        }),
        {}
      ),
    [inputs, initials]
  );

  const inputMap = useMemo(
    () =>
      inputs?.reduce(
        (acc: any, input: any) => ({
          ...acc,
          [input.name]: { ...input, validateSelf: input.validateSelf || true },
        }),
        {}
      ),
    [inputs]
  );

  const [loading, setLoading] = useState(false);
  const [inputTypes, setInputTypes] = useState(initialInputs);
  const [errors, setErrors] = useState(initialError);
  const { addToast } = useToasts();

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      submitButton.current.click();
    }
  };

  useEffect(() => {
    const form = formRef?.current;
    form?.addEventListener('keydown', handleKeyDown);

    return () => {
      form?.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requiredKeys = inputs.reduce((acc: any, input: any) => {
      if (input.required || inputTypes[input.name]) {
        return { ...acc, [input.name]: inputTypes[input.name] };
      }
      return acc;
    }, {});

    // validate forms
    const errorMap: {
      [key: string]: boolean;
    } = Object.keys(requiredKeys).reduce(
      (acc, inputName) => ({
        ...acc,
        [inputName]: inputMap[inputName].validateSelf
          ? !validate(requiredKeys[inputName], inputName)
          : false,
      }),
      {}
    );

    setErrors(errorMap);

    // check if at least one element fails validation
    const shouldNotSubmit = Object.keys(errorMap).some(
      (inputName) => errorMap[inputName]
    );

    if (shouldNotSubmit && validateForm) {
      addToast('Please ensure the form is complete', {
        appearance: 'warning',
        autoDismiss: true,
      });
      errorMap.reset = false;
      errorMap.onSubmit = true;

      return;
    }

    errorMap.onSubmit = true;
    errorMap.reset = false;

    submitButton.current.disabled = true;
    setLoading(true);

    let response;

    try {
      response = await cb(
        Object.keys(inputTypes).reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: inputTypes[cur] ? inputTypes[cur] : undefined,
          }),
          {}
        )
      );

      setLoading(false);
    } catch (error) {
      const formError: any = error;

      console.log(error);
      if (formError.response) {
        if (formError.response.status === 500) {
          formError.message = 'Network error please try again';
        } else formError.message = formError.response.data.error;
      } else formError.message = formError.message || 'Error occured';

      const err = Array.isArray(formError.message)
        ? formError.message.join(', ')
        : formError.message;

      addToast(err, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 10000,
      });

      if (submitButton.current) {
        submitButton.current.disabled = false;
      }

      setLoading(false);
      return;
    }

    return { msg: 'success', response };
  };

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;

    if (inputMap[name].validateSelf) {
      const newErrors = { ...errors, [name]: !validate(value, name) };
      newErrors.onSubmit = false;
      newErrors.reset = false;
      setErrors(newErrors);
    }

    setInputTypes({
      ...inputTypes,
      [name]: type === 'checkbox' ? !!checked : value,
    });
  };

  const resetInputs = () => {
    setInputTypes(initialInputs);
    setErrors({ ...initialError, reset: true });
  };

  return {
    handleSubmit,
    handleChange,
    inputTypes,
    errors,
    setInputTypes,
    loading,
    resetInputs,
  };
};
