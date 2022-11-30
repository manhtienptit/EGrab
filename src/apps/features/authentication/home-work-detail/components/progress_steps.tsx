/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { CustomOmit } from '@common';
import { HelperText, TextField } from '@components';
import { InputFlatProps } from '@components/text-field/components/flat/type';
import { FormLoginType } from '@model/authentication';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { View , Text } from 'react-native';

interface ProgressStepProps<T extends Record<string, any>>
  extends CustomOmit<InputFlatProps, 'nameTrigger'>,
    React.RefAttributes<any> {
  name: keyof T;
  nameTrigger?: keyof T;
}
export const ProgressStatus = <T extends Record<string, any>>({
  step = 0,
  name,
  nameTrigger,
  onPaymentStepComplete,
  onPrevStep,
  onNextStep,
  onSubmitSteps,
  defaultValue = '',
  ...rest
}: ProgressStepProps<T>) => {
  // state
  // const { trigger, getValues } = useFormContext<FormLoginType>();
  // const {
  //   field,
  //   fieldState: { error },
  // } = useController({
  //   name: name as string,
  //   defaultValue,
  // });

  const defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center'
        }
    };

  // render
  return (
    <>
        <ProgressSteps activeStep={step} >
            <ProgressStep
                label="Chờ tiếp nhận"
                removeBtnRow
                scrollViewProps={defaultScrollViewProps}
            >
            </ProgressStep>
            <ProgressStep
                label="Đang xử lý"
                removeBtnRow
                scrollViewProps={defaultScrollViewProps}
            >
            </ProgressStep>
            <ProgressStep
                label="Hòan thành"
                removeBtnRow
                scrollViewProps={defaultScrollViewProps}
            >
            </ProgressStep>
        </ProgressSteps>
    </>
  );
};
