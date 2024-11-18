import { PagesSortI } from './common';

export interface UserI {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface UsersListI {
  content: UserI[];
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
