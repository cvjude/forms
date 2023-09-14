import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDebounce = (value: any, delay: number): [any] => {
  const [debounce, setDebounce] = useState(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return [debounce];
};
