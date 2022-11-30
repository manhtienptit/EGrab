/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { CustomOmit } from '@common';
import { HelperText, TextField } from '@components';
import { InputFlatProps } from '@components/text-field/components/flat/type';
import {FormInformationType} from "@model/user";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native";

interface InputProps<T extends Record<string, any>>
  extends CustomOmit<InputFlatProps, 'nameTrigger'>,
    React.RefAttributes<any> {
  name: keyof T;
  nameTrigger?: keyof T;
}

export const Input = <T extends Record<string, any>>({
  onSubmit,
  onPressIn,
  label,
  name,
  nameTrigger,
  defaultValue = '',
  ...rest
}: InputProps<T>) => {

  // state
  const { trigger, getValues } = useFormContext<FormInformationType>();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: name as string,
    defaultValue,
  });

  // render
  return (
    <TouchableWithoutFeedback onPressIn={onPressIn}>
      <>
      <TextField
        onPress = {() => {console.log('TEST')}}
        onSubmit={onSubmit}
        ref={field.ref}
        nameTrigger={nameTrigger as string}
        trigger={trigger}
        error={error?.message !== undefined}
        label={label}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={(getValues() as Record<string, string>)[name as string]}
        typeInput={'outline'}
        {...rest}
      />
      <HelperText
        visible={error?.message !== undefined}
        msg={error?.message ?? ''}
        type={'error'}
      />
     </>
    </TouchableWithoutFeedback>
  );
};
