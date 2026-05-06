import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';

export default function RouteLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    // Only trigger loader when path actually changes
    if (location.pathname !== prevPath) {
      setLoading(true);
      setPrevPath(location.pathname);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 900); // show for 900ms — smooth but not too long

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (!loading) return null;
  return <PageLoader />;
}
