import React, { FC } from 'react';
import classNames from 'classnames';
import { Eye } from 'assets/icons/eye';
import { Hide } from 'assets/icons/hide';
import { useInput } from 'hooks/useInput';
import styles from './style.module.scss';
import { PhoneNumberSelect } from './phoneNumberSelect';

interface InputProps {
  type?: string;
  name: string;
  placeHolder?: string;
  value?: string;
  errorMsg?: string;
  valErrorMsg?: string;
  required?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordReviel?: () => void;
  attr?: any;
  open?: boolean;
  example?: string;
  className?: string;
  errors?: any;
  usePlaceHolder?: boolean;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  name,
  placeHolder = 'Place Holder',
  usePlaceHolder = true,
  value,
  errorMsg = '',
  valErrorMsg,
  required = false,
  handleChange = () => {
    return;
  },
  onPasswordReviel = () => {
    return;
  },
  attr = {},
  open = false,
  example,
  className = '',
  errors,
}) => {
  const inputCon = React.createRef<HTMLDivElement>();
  const inputRef = React.createRef<HTMLTextAreaElement>();

  const {
    setShowPassword,
    showPassword,
    errorMessage,
    internalValue,
    typing,
    setTyping,
    inputInternalError,
    choosePhoneExt,
    validateOne,
    isPhoneNumber,
    error,
  } = useInput({
    type,
    name,
    value,
    errorMsg,
    valErrorMsg,
    required,
    handleChange,
    open,
    errors,
    inputCon,
  });

  return (
    <div className={classNames(styles['input-div'], className || 'mb-5')}>
      <div className={styles['input']}>
        <div
          className={classNames(styles['input-con'], {
            'flex items-center z-10': isPhoneNumber,
            'z-0': !isPhoneNumber,
            [styles['phone']]: isPhoneNumber,
          })}
          ref={inputCon}
        >
          {isPhoneNumber && (
            <div className="relative w-20 h-5 pt-1.5">
              <PhoneNumberSelect choosePhoneExt={choosePhoneExt} />
            </div>
          )}

          {type === 'textarea' ? (
            <textarea
              className={classNames(styles['input-type'], styles['text-area'], {
                'pt-5': usePlaceHolder,
              })}
              required={required}
              name={name}
              onChange={validateOne}
              value={value}
              rows={5}
              ref={inputRef}
              placeholder={
                example && (typing || error || !usePlaceHolder) ? example : ''
              }
            />
          ) : (
            <>
              <input
                onFocus={() => setTyping(true)}
                onBlur={() => {
                  setTyping(false);
                }}
                className={classNames(styles['input-type'], {
                  '!pt-5': usePlaceHolder,
                })}
                type={showPassword ? 'text' : type}
                required={required}
                name={name}
                onChange={validateOne}
                value={value}
                ref={inputRef}
                {...attr}
                placeholder={
                  example && (typing || error || !usePlaceHolder) ? example : ''
                }
              />
            </>
          )}

          {usePlaceHolder && (
            <div className={styles['el-spans']}>
              <span style={{ zIndex: '-1' }} className={styles['place-holder']}>
                {placeHolder}{' '}
              </span>
            </div>
          )}

          {(value || internalValue) && type.includes('password') ? (
            <span
              onClick={() => {
                setShowPassword(!showPassword);
                onPasswordReviel();
              }}
              className={styles['reviel-password']}
            >
              {!showPassword ? <Eye /> : <Hide />}
            </span>
          ) : null}

          <p
            className={classNames(
              styles['error'],
              'absolute right-0 top-0 mr-2.5 text-tomato'
            )}
            style={{ display: error || inputInternalError ? 'block' : 'none' }}
          >
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
