import { useCallback, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { debouncedSearch } from '@/lib/debounce';

interface UseDebouncedSearchOptions {
  searchParam?: string;
  onSearchChange?: (value: string) => void;
}

export const useDebouncedSearch = ({
  searchParam = 'search',
  onSearchChange,
}: UseDebouncedSearchOptions = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search).get(searchParam) || '';
  const [search, setSearch] = useState(urlSearch);
  const [lastUrlSearch, setLastUrlSearch] = useState(urlSearch);

  // Sync input when URL changes externally (back/forward navigation)
  // This uses React's "adjusting state during rendering" pattern to avoid an extra render
  if (urlSearch !== lastUrlSearch) {
    setLastUrlSearch(urlSearch);
    setSearch(urlSearch);
  }

  const debouncedUrlUpdate = useMemo(() => {
    return (value: string) => {
      debouncedSearch((finalValue: string) => {
        const params = new URLSearchParams(window.location.search);
        if (finalValue.trim()) {
          params.set(searchParam, finalValue);
        } else {
          params.delete(searchParam);
        }
        navigate(`?${params.toString()}`, { replace: true });
      }, value);
    };
  }, [searchParam, navigate]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      debouncedUrlUpdate(value);
      onSearchChange?.(value);
    },
    [debouncedUrlUpdate, onSearchChange]
  );

  return { search, handleSearchChange };
};
