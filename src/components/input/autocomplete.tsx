import React, { FC, useCallback, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import classNames from 'classnames';
import { Close } from 'assets/icons/close';
import { useDebounce } from 'hooks/useDebounce';
import { useDropDown } from 'hooks/useDropdown';
import { useInput } from 'hooks/useInput';
import { stringSearch } from 'utils/helpers';
import styles from './style.module.scss';
import { DropComponent } from './dropComponent';

interface AutoCompleteDropDownProps {
  type?: string;
  name: string;
  placeHolder?: string;
  value?: any;
  errorMsg?: string;
  valErrorMsg?: string;
  required?: boolean;
  handleChange?: (e: any) => void;
  attr?: any;
  open?: boolean;
  example?: string;
  errors?: any;
  url?: (value: string) => Promise<any> | string;
  inputs?: any;
  color?: string;
  icon?: any;
  className?: string;
  id?: string;
  isMultiSelect?: boolean;
  keyName?: string;
  valueName?: string;
}

export const AutoCompleteDropDown: FC<AutoCompleteDropDownProps> = ({
  type = 'select',
  name,
  placeHolder = 'Place Holder',
  value,
  errorMsg = '',
  valErrorMsg,
  required = false,
  handleChange = () => {
    return;
  },
  attr = {},
  open = false,
  example,
  errors,
  url,
  inputs,
  color,
  icon,
  className,
  id,
  isMultiSelect = false,
  // keyName = 'name',
  // valueName = 'value',
}) => {
  const inputCon = React.createRef<any>();
  const inputRef = React.createRef<any>();
  const parentRef = React.createRef<any>();

  const eventType = React.useRef<any>();

  const [innerInputs, setInnerInputs] = useState([]);
  const [internalLists, setInternalLists] = useState<any>([]);
  const [inputValue, setInputValue] = useState(
    value ? (typeof value === 'object' ? Object.keys(value)[0] : value) : ''
  );
  const [valueList, setValueList] = useState<any>([]);

  const [debounced] = useDebounce(inputValue, 500);

  const { addToast } = useToasts();

  const error = errors?.[name];

  const handleInputChange = ({ target: { value } }: any) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (!value) return;

    setInputValue(
      value ? (typeof value === 'object' ? Object.keys(value)[0] : value) : ''
    );
  }, [value]);

  const {
    showPassword,
    typing,
    setTyping,
    validateOne,
    setPhoneExtValue,
    isPhoneNumber,
    internalValue,
  } = useInput({
    type,
    name,
    value: inputValue,
    errorMsg,
    valErrorMsg,
    required: error,
    handleChange: handleInputChange,
    open,
    errors,
    inputCon,
  });

  const handleClick = (
    name: string,
    value: any | null | undefined,
    key: string
  ) => {
    if (isMultiSelect) {
      if (!innerInputs.length) {
        handleChange({ target: { name, value: [internalValue] } });
        setInputValue('');
        return;
      }

      if (valueList?.includes(value)) return;
      const newValues = [...internalLists, { [key]: value }];
      const newValueList = [...valueList, value];

      handleChange({ target: { name, value: newValueList } });
      setInternalLists(newValues);
      setValueList(newValueList);
      setInputValue('');
    } else {
      handleChange({ target: { name, value: { [key]: value } } });
      setInputValue(key);
    }
  };

  const {
    revileDropDown,
    closeFromOutside,
    close,
    openDrop,
    dropRef,
    activeIndex,
  } = useDropDown({
    name,
    parentRef,
    disabled: false,
    handleClick,
    innerInputs,
    type: 'autocomplete',
  });

  useEffect(() => {
    if (!openDrop && value === '') {
      setInputValue('');
    }
  }, [openDrop, value]);

  const sortThrough = useCallback(() => {
    setInnerInputs(
      inputs.filter((input: any) => stringSearch(internalValue, input.name))
    );

    revileDropDown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, internalValue]);

  useEffect(() => {
    if (debounced && eventType.current === 'Input') {
      if (url) {
        try {
          if (typeof url === 'function') {
            if (debounced === Object.keys(value)[0]) return;

            // @ts-ignore
            url(debounced).then((res) => {
              setInnerInputs(res);
            });
          }

          // if (typeof url === 'string') {
          // }
          //
        } catch (err) {
          addToast('An error occured', {
            appearance: 'error',
            autoDismiss: true,
          });
        }

        revileDropDown();
      } else {
        sortThrough();
      }
    } else {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const removeItem = (value: any) => {
    const newValues = internalLists.filter(
      (item: any) => Object.values(item)[0] !== value
    );
    const newValueList = valueList.filter((item: any) => item !== value);

    handleChange({ target: { name, value: newValueList } });
    setValueList(newValueList);
    setInternalLists(newValues);
  };

  const autocompletelist = value || valueList;
  const hasValues = autocompletelist.length > 0;

  const closeDropDown = (e: any) => {
    closeFromOutside(e);

    if (isMultiSelect)
      setTimeout(() => {
        setInputValue('');
      }, 500);
  };

  return (
    <>
      <div
        className={classNames(
          styles['input-div'],
          {
            'mb-2': hasValues,
            'mb-5': !hasValues,
          },
          className
        )}
        ref={parentRef}
        onBlur={closeDropDown}
        tabIndex={-1}
      >
        <div className={classNames(styles['input'], 'flex items-center')}>
          {icon && <div className="pl-5">{icon}</div>}
          <div
            className={classNames(styles['input-con'], 'z-0 flex-1', {
              [`open ${color}`]: open,
            })}
            style={{ zIndex: openDrop ? 100 : 0 }}
            ref={inputCon}
          >
            <input
              onFocus={() => {
                setTyping(true);
                eventType.current = 'Input';
              }}
              onBlur={() => {
                setTyping(false);
                isPhoneNumber && setPhoneExtValue();
                eventType.current = '';
              }}
              className={styles['input-type']}
              type={showPassword ? 'text' : type}
              required={required}
              name={name}
              onChange={validateOne}
              value={internalValue}
              ref={inputRef}
              {...attr}
              placeholder={example && (typing || error || open) ? example : ''}
              id={id}
            />

            <div className={styles['el-spans']}>
              <span style={{ zIndex: '-1' }} className={styles['place-holder']}>
                {placeHolder}{' '}
              </span>
            </div>

            <div className={styles['select']}>
              <DropComponent
                openDrop={openDrop}
                innerInputs={innerInputs}
                dropRef={dropRef}
                activeIndex={activeIndex}
                handleClick={handleClick}
                close={close}
                name={name}
              />
            </div>

            <p
              className={classNames(
                styles['error'],
                'absolute right-0 top-0 mr-2.5 text-tomato'
              )}
              style={{
                display: error ? 'block' : 'none',
              }}
            >
              {errorMsg}
            </p>
          </div>
        </div>
      </div>

      {hasValues && isMultiSelect && (
        <div className="mb-4 flex flex-wrap">
          {Array.isArray(autocompletelist) &&
            autocompletelist.map((value, index) => (
              <div
                key={`mulit_select_keys_${index}`}
                className="flex-shrink-0 bg-theme text-white text-sm px-4 py-0.5 mr-2.5 rounded-xl items-center flex mb-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeItem(value);
                }}
              >
                <button className="mr-3">
                  <Close className="w-2.5 h-2.5 fill-current" />
                </button>
                {value}
              </div>
            ))}
        </div>
      )}
    </>
  );
};
