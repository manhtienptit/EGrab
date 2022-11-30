import {InputFlatProps} from "src/app/library/components/text-field/components/flat/type";
import {CustomOmit} from "@common";
import React from "react";
import {useController, useFormContext} from "react-hook-form";
import {Select} from "@components";
import {FormInformationType} from "@model/user";

interface SelectGenderProps<T extends Record<string, any>>
    extends CustomOmit<InputFlatProps, 'nameTrigger'>,
        React.RefAttributes<any> {
    name: keyof T;
    nameTrigger?: keyof T;
}

export const SelectGender = <T extends Record<string, any>>({
         onSubmit,
         label,
         name,
         nameTrigger,
         defaultValue = '',
         ...rest
   }: SelectGenderProps<T>) => {

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
        <>
            <Select
                onSubmit={onSubmit}
                nameTrigger={nameTrigger as string}
                trigger={trigger}
                error={error?.message !== undefined}
                label={label}
                onPress={field.onChange}
                onBlur={field.onBlur}
                defaultValue={(getValues() as Record<string, string>)[name as string]}
                typeInput={'outline'}
                {...rest}
            />
        </>
    );
};

