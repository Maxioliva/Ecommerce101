import { useEffect } from 'react';

type UseClickOutsideProps = {
  ref: React.MutableRefObject<any>;
  callback: () => void;
};

const useClickOutside = ({ ref, callback }: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
export default useClickOutside;
