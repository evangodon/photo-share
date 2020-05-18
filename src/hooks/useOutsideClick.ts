import { useEffect } from 'react';

/**
 * Hook for handling a click outside of the element who's ref is passed
 * as an argument.
 *
 * @param ref
 * @param callback
 */
export const useOutsideClick = (ref, callback: () => void) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
