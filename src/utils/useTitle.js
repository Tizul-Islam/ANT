import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ANT` : 'ANT - Auto Network Technology';
  }, [title]);
};

export default useTitle;
