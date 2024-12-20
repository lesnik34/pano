import { PagesSortI } from './common';
import { UserI } from './users';

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
  statuses?: Array<string>;
  size?: number;
  executor?: number;
  creator?: number;
}

export interface TaskI {
  id: string;
  status: TaskStatus;
  title?: string;
  description?: string;
  executor: UserI;
  creator: UserI;
  createdDate?: string;
  endDate?: string;
}

export interface NewTaskI {
  title: string;
  executor?: number;
  description: string;
  creator?: number;
  endDate?: string;
}
export interface EditTaskI {
  id: string;
  title: string;
  description?: string;
  executor?: number;
  creator?: number;
  endDate?: string;
}

export interface ShortTaskI {
  id: string;
  status: TaskStatus;
  title?: string;
  description?: string;
  creator: UserI;
  executor: UserI;
  createdDate?: string;
  endDate?: string;
}

export enum TaskStatus {
  toDo = 'TO_DO',
  inProgress = 'IN_PROGRESS',
  done = 'DONE',
  canceled = 'CANCELED',
}
