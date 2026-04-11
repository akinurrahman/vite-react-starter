import { useCallback, useMemo } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import type { FilterConfig } from '../types';

export function useFilters(config: FilterConfig[]) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const filters = useMemo(() => {
    const result: Record<string, string | undefined> = {};

    searchParams.forEach((v, k) => {
      result[k] = v || undefined;
    });

    config.forEach(field => {
      if (!result[field.key] && field.defaultValue) {
        result[field.key] = field.defaultValue;
      }
    });

    return result;
  }, [searchParams, config]);

  const applyFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === '#') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      navigate(`?${params.toString()}`, { replace: true });
    },
    [navigate, searchParams]
  );

  const clearAll = useCallback(() => {
    navigate('?', { replace: true });
  }, [navigate]);

  const activeCount = useMemo(() => {
    return config.filter(field => {
      if (field.disabled) return false;
      const v = filters[field.key];
      return v && v !== '#' && v !== 'all';
    }).length;
  }, [filters, config]);

  return { filters, applyFilters, clearAll, activeCount };
}
