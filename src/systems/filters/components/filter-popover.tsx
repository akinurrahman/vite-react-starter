import React, { useEffect, useState } from 'react';

import { Button } from '@ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Filter } from 'lucide-react';

import { useFilters } from '../hooks/use-filters';
import type { FilterConfig } from '../types';
import { renderFilterField } from '../utils/filter-renderer';

interface FilterPopoverProps {
    config: FilterConfig[];
    onTempFilterChange?: (filters: Record<string, string | undefined>) => void;
}

export function FilterPopover({ config, onTempFilterChange }: FilterPopoverProps) {
    const { filters, applyFilters, clearAll, activeCount } = useFilters(config);

    const [open, setOpen] = useState(false);
    const [tempFilters, setTempFilters] = useState(filters);

    useEffect(() => {
        if (!open) {
            setTempFilters(filters);
        }
    }, [filters, open]);

    useEffect(() => {
        onTempFilterChange?.(tempFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempFilters]);

    const handleApply = () => {
        applyFilters(tempFilters);
        setOpen(false);
    };

    const handleClear = () => {
        clearAll();
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="relative">
                    <Filter size={16} />
                    {activeCount > 0 && (
                        <span className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none text-white">
                            {activeCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-90 p-4" align="start">
                <div className="grid grid-cols-2 gap-4">
                    {config.map(item => {
                        if (item.dependsOn && !item.alwaysVisible && !tempFilters[item.dependsOn]) return null;
                        return (
                            <React.Fragment key={item.key}>
                                {renderFilterField(
                                    item,
                                    tempFilters[item.key],
                                    v => {
                                        setTempFilters(prev => {
                                            const next: Record<string, string | undefined> = { ...prev, [item.key]: v };
                                            const cleared = new Set<string>([item.key]);
                                            let progress = true;
                                            while (progress) {
                                                progress = false;
                                                config.forEach(c => {
                                                    if (c.dependsOn && cleared.has(c.dependsOn) && !cleared.has(c.key)) {
                                                        next[c.key] = undefined;
                                                        cleared.add(c.key);
                                                        progress = true;
                                                    }
                                                });
                                            }
                                            return next;
                                        });
                                    },
                                    tempFilters
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button onClick={handleApply}>Apply</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
