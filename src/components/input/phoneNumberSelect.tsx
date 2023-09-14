import { FC } from 'react';
import Image from 'next/image';
import phoneCodes from 'data/phoneCodes';
import { Select } from './select';

export const PhoneNumberSelect: FC<{
  choosePhoneExt: any;
}> = ({ choosePhoneExt }) => {
  return (
    <Select
      inputs={phoneCodes}
      optionSchema={optionSchema}
      value={'234'}
      showDefaultOption={false}
      placeHolderSchema={placeHolderSchema}
      handleSelect={choosePhoneExt}
      name="phoneExt"
    />
  );
};

const optionSchema = (inputName: string, openDrop: boolean) => {
  return (
    <div className="flex">
      {openDrop && (
        <Image
          alt="flag"
          style={{ width: '20px', height: '15px' }}
          className="mr-4"
          src={
            inputName
              ? `https://flagcdn.com/20x15/${inputName.toLowerCase()}.png`
              : 'https://flagcdn.com/20x15/ng.png'
          }
          width="20"
          height="15"
        />
      )}
      <p>{inputName}</p>
    </div>
  );
};

const placeHolderSchema = (placeholder: string) => {
  return (
    <div className="flex">
      <Image
        alt="flag"
        style={{ width: '20px', height: '15px' }}
        className="mr-4"
        src={
          placeholder
            ? `https://flagcdn.com/20x15/${placeholder.toLowerCase()}.png`
            : 'https://flagcdn.com/20x15/ng.png'
        }
        width="20"
        height="15"
      />
      <p>{placeholder}</p>
    </div>
  );
};
