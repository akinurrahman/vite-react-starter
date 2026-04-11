import { useEffect, useRef } from 'react';

import { FormControl } from '@ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { type ControllerRenderProps, useFormContext, useWatch } from 'react-hook-form';

import { type SingleSelectFieldProps } from '../../types';

interface SelectProps {
    props: SingleSelectFieldProps;
    field: ControllerRenderProps;
}

const NO_PARENT = '__FormInput_cascade_none__';

const SelectField = ({ props, field }: SelectProps) => {
    const { setValue, getValues } = useFormContext();

    const parentValue = useWatch({ name: props.dependsOn ?? NO_PARENT });

    const isMounted = useRef(false);
    useEffect(() => {
        if (!props.dependsOn) return;
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        setValue(props.name, '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentValue]);

    const resolvedOptions = props.optionsFn
        ? props.optionsFn(getValues() as Record<string, unknown>)
        : (props.options ?? []);

    return (
        <Select
            disabled={props.disabled}
            onValueChange={value => value && field.onChange(value)}
            value={field.value}
        >
            <FormControl>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {resolvedOptions.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectField;
