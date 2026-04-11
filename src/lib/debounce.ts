import { debounce } from 'lodash';

export const debouncedSearch = debounce((callback: (value: string) => void, value: string) => {
  callback(value);
}, 500);
