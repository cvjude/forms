import React, { useState, useEffect, FC } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

interface RadioProps {
  name: string;
  inputs: {
    name: string;
    value: string;
    desc?: string;
    Icon?: any;
  }[];
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeHolder?: string;
  error?: boolean;
  errorMessage?: string;
}

export const Radio: FC<RadioProps> = ({
  name,
  inputs,
  handleSelect,
  value,
  placeHolder,
  error,
  errorMessage,
}) => {
  const [presentValue, setPresentValue] = useState(value);
  const type = inputs[0].desc ? 'special' : '';

  useEffect(() => {
    setPresentValue(value);
  }, [value]);

  const parent = React.createRef<any>();

  const handleClick = (eName: string, eValue: any) => {
    setPresentValue(value);

    handleSelect({ target: { name: eName, value: eValue } } as any);
  };

  const options = inputs.map((input, index) => (
    <button
      className={classNames(
        styles['rad_options'],
        styles.radial,
        'relative pl-6 text-txt flex flex-col py-0.5',
        {
          [styles.selected]: input.value === presentValue,
        }
      )}
      type="button"
      key={index}
      value={input.value}
      onClick={() => handleClick(name, input.value)}
    >
      {input.name}
    </button>
  ));

  const optionsSpecial = inputs.map((input, index) => (
    <button
      className={classNames(
        styles['rad_options'],
        'relative text-txt flex items-center bg-dash w-full px-5 py-2 rounded-xl mb-5',
        {
          [styles.selected]: input.value === presentValue,
        }
      )}
      type="button"
      key={index}
      value={input.value}
      onClick={() => handleClick(name, input.value)}
    >
      <input.Icon className="h-6 w-6" />
      <div className="ml-5 flex flex-col items-start text-txt-med">
        <h2 className="font-weight">{input.name}</h2>
        <p className="text-[#8B929E] text-xs">{input.desc}</p>
      </div>
    </button>
  ));

  return (
    <div
      className={classNames(
        styles['input-div'],
        styles.radx,
        'w-full relative p-0',
        type
      )}
      ref={parent}
    >
      {placeHolder && (
        <label className="mb-2 text-txt block font-semibold">
          {placeHolder}
        </label>
      )}
      <div>{type === 'special' ? optionsSpecial : options}</div>
      <p
        className={classNames(
          styles.error,
          'absolute right-0 top-0 mr-2.5 text-tomato'
        )}
        style={{ display: error ? 'block' : 'none' }}
      >
        {errorMessage}
      </p>
    </div>
  );
};
