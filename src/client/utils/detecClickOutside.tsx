import { useEffect } from 'react';

type UseClickOutsideProps = {
  ref: React.MutableRefObject<any>;
  callback: () => void;
  condition?: boolean;
};

const useClickOutside = ({ ref, callback, condition }: UseClickOutsideProps) => {
  useEffect(() => {
    if (!condition) {
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, condition]);
};
export default useClickOutside;
