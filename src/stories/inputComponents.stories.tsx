import { FC, useState } from 'react';
import { Input } from 'components/input';
import { AutoCompleteDropDown } from 'components/input/autocomplete';
import { Select } from 'components/input/select';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Component/Input',
  component: Input,
};

// Can take a value
export const RegularInput: FC = () => {
  const [val, setValue] = useState('');

  const handleChange = ({ target: { value } }: any) => {
    setValue(value);
  };

  return (
    <div style={{ width: '300px' }}>
      <Input
        type="text"
        placeHolder="FirstName"
        name="firstName"
        value={val}
        handleChange={handleChange}
      />
    </div>
  );
};

// it has an internal value too
export const InputPasswordWithoutValueState: FC = () => {
  return (
    <div style={{ width: '300px' }}>
      <Input type="password" placeHolder="Enter a password" name="password" />
    </div>
  );
};

export const InputTextArea: FC = () => {
  return (
    <div style={{ width: '300px' }}>
      <Input type="textarea" placeHolder="Enter a description" name="desc" />
    </div>
  );
};

export const RegularSelect: FC = () => {
  return (
    <div style={{ width: '300px' }}>
      <Select
        name="select"
        inputs={[
          { name: 'One', value: 1 },
          { name: 'Two', value: 2 },
          { name: 'Three', value: 3 },
          { name: 'Four', value: 4 },
          { name: 'Five', value: 5 },
          { name: 'Six', value: 6 },
          { name: 'Seven', value: 7 },
          { name: 'Eight', value: 8 },
          { name: 'Nine', value: 9 },
          { name: 'Ten', value: 10 },
          { name: 'Eleven', value: 11 },
          { name: 'Twelve', value: 12 },
          { name: 'Thirteen', value: 13 },
          { name: 'Fourteen', value: 14 },
          { name: 'Fifteen', value: 15 },
          { name: 'Sixteen', value: 16 },
          { name: 'Seventeen', value: 17 },
          { name: 'Eighteen', value: 18 },
          { name: 'Nineteen', value: 19 },
          { name: 'Twenty', value: 20 },
        ].sort((a, b) => a.name.localeCompare(b.name))}
        placeHolder="Select Values"
      />
    </div>
  );
};

export const PhoneNumber: FC = () => {
  const [val, setValue] = useState('');

  const handleChange = ({ target: { value } }: any) => {
    setValue(value);
  };

  return (
    <div style={{ width: '300px' }}>
      <Input
        name="phone"
        type="phone"
        value={val}
        handleChange={handleChange}
      />
    </div>
  );
};

export const AutoCompleteElement: FC = () => {
  return (
    <div style={{ width: '300px' }}>
      <AutoCompleteDropDown
        name="auto-complete"
        inputs={[
          { name: 'One', value: 'One' },
          { name: 'Two', value: 'Two' },
          { name: 'Three', value: 'Three' },
          { name: 'Four', value: 'Four' },
          { name: 'Five', value: 'Five' },
          { name: 'Six', value: 'Six' },
          { name: 'Seven', value: 'Seven' },
          { name: 'Eight', value: 'Eight' },
          { name: 'Nine', value: 'Nine' },
          { name: 'Ten', value: 'Ten' },
          { name: 'Eleven', value: 'Eleven' },
          { name: 'Twelve', value: 'Twelve' },
          { name: 'Thirteen', value: 'Thirteen' },
          { name: 'Fourteen', value: 'Fourteen' },
          { name: 'Fifteen', value: 'Fifteen' },
          { name: 'Sixteen', value: 'Sixteen' },
          { name: 'Seventeen', value: 'Seventeen' },
          { name: 'Eighteen', value: 'Eighteen' },
          { name: 'Nineteen', value: 'Nineteen' },
          { name: 'Twenty', value: 'Twenty' },
        ].sort((a, b) => a.name.localeCompare(b.name))}
        placeHolder="Select Values"
      />
    </div>
  );
};
