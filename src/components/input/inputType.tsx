import { FC } from 'react';
import { Input } from '.';
import { AutoCompleteDropDown } from './autocomplete';
import { CheckBox } from './checkbox';
import { Radio } from './radio';
import { Select } from './select';

export const InputType: FC<any> = (props: any) => {
  return (
    <>
      {props.itype === 'select' && <Select {...props} />}
      {props.itype === 'checkbox' && <CheckBox {...props} />}
      {props.itype === 'radio' && <Radio {...props} />}
      {props.itype === 'text' && <Input {...props} />}
      {props.itype === 'textarea' && <Input {...props} />}
      {props.itype === 'autocomplete' && <AutoCompleteDropDown {...props} />}
    </>
  );
};
