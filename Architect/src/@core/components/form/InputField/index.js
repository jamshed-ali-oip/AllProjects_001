import React from 'react';
import {TextInput} from 'react-native';
import {Controller} from 'react-hook-form';

const InputField = ({control, name, label, placeholder, ...props}) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({
          field: {onChange, onBlur, value, ref},
          fieldState: {error},
        }) => (
          <TextInput
            {...props}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            placeholder={placeholder}
          />
        )}
        name={label}
      />
    </>
  );
};

export default InputField;
