import React, { useState } from 'react';
import { TextInput } from '@mantine/core';

type InputProps = {
  label: string;
  type: string;
  formLabel: string;
  placeholder: string;
  form: any;
  required: boolean;
};


export function LabelInput(props: InputProps) {
  const { label, placeholder, form, formLabel, required, type} = props;
  const [value, setValue] = useState('');

  return (
    <TextInput
      label={label}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      mt="md"
      autoComplete="nope"
      {...form.getInputProps(formLabel)}
    />
  );
}

export default LabelInput;
