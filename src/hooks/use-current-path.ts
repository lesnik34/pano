import { matchPath, useLocation } from 'react-router-dom';

const useCurrentPath = (path: string) => {
  const { pathname } = useLocation();
  const isPathMatch = matchPath(path, pathname);

  return { isPathMatch: !!isPathMatch };
};

export default useCurrentPath;
