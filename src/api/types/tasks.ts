import { PagesSortI } from './common';

export interface TasksListResI {
  content: ShortTaskI[];
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

export interface TasksListQueryI {
  page?: number;
  status?: Array<string>;
}

export interface TaskI {
  id: string;
  status: TaskStatus;
  title?: string;
  description?: string;
  executor: string;
  date_start?: string;
  date_end?: string;
}

export interface ShortTaskI {
  id: string;
  status: TaskStatus;
  title?: string;
  description?: string;
  executor: string;
  date_start?: string;
  date_end?: string;
}

export enum TaskStatus {
  toDo = 'TO_DO',
  inProgress = 'IN_PROGRESS',
  done = 'DONE',
  canceled = 'CANCELED',
}
