import React, { useCallback } from 'react';
import { Pagination as PaginationNext } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';
import { TASK_PARAMS } from '@/constants/pages';

interface PaginationI {
  totalPages?: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationI> = ({ totalPages = 0, currentPage }) => {
  const searchParams = useSearchParams();
  const setSearchParams = searchParams[1];

  const onChange = useCallback(
    (page: number) => {
      setSearchParams((params) => {
        params.set(TASK_PARAMS.page, String(page));
        return params;
      });
    },
    [setSearchParams],
  );

  return (
    <div>
      <PaginationNext onChange={onChange} total={totalPages} page={currentPage} />
    </div>
  );
};

export default Pagination;
