import React, { useState, useEffect, useCallback, FC, useMemo } from 'react';
import classNames from 'classnames';
import { useDropDown } from 'hooks/useDropdown';
import styles from './style.module.scss';
import { DropComponent } from './dropComponent';

interface SelectProps {
  name: string;
  placeHolder?: string;
  inputs: {
    name: string;
    value: any;
  }[];
  label?: string;
  handleSelect?: (e: any) => void;
  required?: boolean;
  value?: string;
  useArrow?: boolean;
  attr?: any;
  errorMsg?: string;
  valErrorMsg?: string;
  validateSelf?: boolean;
  optionSchema?: (inputName: string, openDrop: boolean) => any;
  showDefaultOption?: boolean;
  placeHolderSchema?: (placeholder: string) => JSX.Element;
  type?: string;
  errors?: any;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  name,
  placeHolder = '',
  inputs,
  label = '',
  handleSelect = () => {
    return;
  },
  required,
  value = '',
  useArrow = true,
  attr = {},
  errors = {},
  optionSchema,
  showDefaultOption = true,
  placeHolderSchema,
  type = 'select',
  errorMsg,
  className,
}) => {
  const [presentValue, setPresentValue] = useState(value || '___def');
  const [presentText, setPresentText] = useState('');
  const [innerInputs, setInnerInputs] = useState(
    showDefaultOption
      ? [{ name: 'Default', value: '___def' }, ...inputs]
      : inputs
  );

  const error = useMemo(
    () => (typeof errors?.[name] !== 'string' && errors?.[name] ? true : false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors?.[name]]
  );

  const selectRef = React.createRef<any>();
  const parent = React.createRef<any>();

  useEffect(() => {
    const val = innerInputs.find(
      (input) => input.value === (value || presentValue)
    );

    setPresentValue(value || presentValue);
    setPresentText(`${val ? val.name : ''}`);

    return () => {
      return;
    };
  }, [label, required, innerInputs, value, presentValue]);

  useEffect(() => {
    setInnerInputs(
      showDefaultOption
        ? [{ name: 'Default', value: '___def' }, ...inputs]
        : inputs
    );
  }, [inputs, showDefaultOption]);

  // Errors map is coming in, replace this logic, infact remove it
  // use the error = usememo.... to check for errors and display

  const handleClick = useCallback(
    (name: string, value: any, current_name: string) => {
      setPresentValue(value);
      setPresentText(current_name);
      const target = { name, value };
      if (value === '___def') {
        handleSelect({ target });
      }
    },
    [handleSelect]
  );

  const {
    toggleDropDown,
    closeFromOutside,
    openDrop,
    dropRef,
    activeIndex,
    close,
  } = useDropDown({
    name,
    parentRef: parent,
    disabled: attr.disabled,
    handleClick,
    innerInputs,
    type,
  });

  const _toggleDropDown = () => {
    const boundaries = dropRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (boundaries.bottom + 200 > windowHeight) {
      dropRef.current.style.top = 'auto';
      dropRef.current.style.bottom = '100%';
    } else {
      dropRef.current.style.top = '0';
      dropRef.current.style.bottom = 'auto';
    }

    toggleDropDown();
  };

  return (
    <div
      className={classNames(styles['input-div'], styles['select_op'], {
        'mb-5': !className,
        [className || '']: className,
      })}
      onBlur={closeFromOutside}
      tabIndex={-1}
      ref={parent}
      {...attr}
    >
      <div className={styles['input']}>
        <div
          className={styles['input-con']}
          style={{ zIndex: openDrop ? 100 : 0 }}
        >
          <div
            // className={`select input-type relative z-0 ${
            //   openDrop || presentValue !== '' ? 'open-drop' : ''
            // }`}
            className={classNames(
              styles['select'],
              styles['input-type'],
              'relative z-0',
              {
                '!pt-5': !!placeHolder,
                [styles['open-drop']]: openDrop || presentValue !== '',
              }
            )}
            ref={selectRef}
            tabIndex={-1}
          >
            <button
              className={classNames(
                styles['currentValue'],
                'flex justify-between items-center w-full text-left pr-8',
                {
                  [styles['open-drop']]: openDrop,
                  [styles['arrow']]: useArrow,
                }
              )}
              type="button"
              onClick={_toggleDropDown}
              aria-label="Open Dropdown"
            >
              {openDrop || presentValue ? (
                <div>
                  {placeHolderSchema
                    ? placeHolderSchema(presentText || label)
                    : presentText || label}
                </div>
              ) : (
                <p />
              )}
            </button>
            <DropComponent
              openDrop={openDrop}
              innerInputs={innerInputs}
              optionSchema={optionSchema}
              dropRef={dropRef}
              presentValue={presentValue}
              activeIndex={activeIndex}
              handleClick={handleClick}
              close={close}
              name={name}
            />
            {/* </div> */}
          </div>

          <div className={styles['el-spans']}>
            <span className={styles['place-holder']}>{placeHolder}</span>
          </div>

          <p
            className={classNames(
              styles.error,
              'absolute right-0 top-0 mr-2.5 text-tomato'
            )}
            style={{ display: error ? 'block' : 'none' }}
          >
            {errorMsg}
          </p>
        </div>
      </div>
    </div>
  );
};
