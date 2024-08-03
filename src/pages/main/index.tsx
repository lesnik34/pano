import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAGE_TASKS } from '@constants/pages';
import PageLoader from '@components/page-loader';

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PAGE_TASKS);
  }, [navigate]);

  return <PageLoader />;
};

export default Main;
