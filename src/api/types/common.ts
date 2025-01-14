export type BaseResponseI<T> = BaseSuccessI<T> | BaseErrorI;

export interface BaseSuccessI<T> {
  status: true;
  body: T;
}

export interface BaseErrorI {
  status: false;
  error: {
    code?: string;
    title?: string;
    message?: string;
  };
}

export interface PagesSortI {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface BaseListWrapperI<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: PagesSortI;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  first: boolean;
  sort: PagesSortI;
  size: number;
  numberOfElements: number;
  empty: boolean;
}
