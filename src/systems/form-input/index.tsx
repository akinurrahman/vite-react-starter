import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@ui/form';
import { Label } from '@ui/label';
import { useFormContext, useWatch } from 'react-hook-form';

import { renderFieldByType } from './render-field-by-types';
import { type FormInputProps } from './types';

const NO_PARENT = '__FormInput_cascade_none__';

export function FormInput(props: FormInputProps) {
    const { control } = useFormContext();

    const parentValue = useWatch({ name: props.dependsOn ?? NO_PARENT, control });

    if (props.dependsOn && !props.alwaysVisible && !parentValue) {
        return null;
    }

    return (
        <FormField
            control={control}
            name={props.name}
            render={({ field }) => {
                return (
                    <FormItem title={props.title || props.label}>
                        {props.label && (
                            <Label>
                                {props.label} {props.required && <span className="text-destructive">*</span>}
                            </Label>
                        )}
                        <FormControl>{renderFieldByType(props, field)}</FormControl>
                        {props.description && <FormDescription>{props.description}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
