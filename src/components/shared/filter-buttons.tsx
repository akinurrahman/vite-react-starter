import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FilterOption {
    label: string;
    value: string;
}

interface FilterButtonsProps {
    options: FilterOption[];
    filterParam?: string;
    defaultOption?: string;
    className?: string;
    onFilterChange?: (value: string) => void;
    variant?: 'tabs' | 'select';
    placeholder?: string;
}

const FilterButtons = ({
    options,
    filterParam = 'status',
    defaultOption = 'All',
    className = '',
    onFilterChange,
    variant = 'tabs',
    placeholder = 'Select an option...',
}: FilterButtonsProps) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const activeFilter = searchParams.get(filterParam) || defaultOption;

    const handleFilterChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value && value !== defaultOption) {
            params.set(filterParam, value);
        } else {
            params.delete(filterParam);
        }

        navigate(`?${params.toString()}`, { replace: true });

        onFilterChange?.(value);
    };

    if (variant === 'tabs') {
        return (
            <div className={`flex gap-2 ${className}`}>
                {options.map(option => (
                    <Button
                        key={option.value}
                        variant={activeFilter === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilterChange(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        );
    }

    return (
        <div className={className}>
            <Select value={activeFilter} onValueChange={handleFilterChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterButtons;
