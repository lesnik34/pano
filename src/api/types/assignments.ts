import { BaseListWrapperI } from './common';
import { DepartmentI } from './departments';
import { UserI } from './users';

export type AssignmentsListResI = BaseListWrapperI<ShortAssignmentI>;

export interface AssignmentsListQueryI {
  page?: number;
  statuses?: Array<string>;
  size?: number;
  executor?: number;
  creator?: number;
  search?: string;
}

export interface AssignmentI {
  id: string;
  status: AssignmentStatus;
  title?: string;
  description?: string;
  department?: DepartmentI;
  executor: UserI;
  creator: UserI;
  createdDate?: string;
}

export interface NewAssignmentI {
  title: string;
  description?: string;
  department?: string;
  executor?: number;
  creator?: number;
}
export interface EditAssignmentI {
  id: string;
  title: string;
  description?: string;
  department?: string;
  executor?: number;
  creator?: number;
}

export interface ShortAssignmentI {
  id: string;
  status: AssignmentStatus;
  title?: string;
  description?: string;
  department?: DepartmentI;
  creator: UserI;
  executor: UserI;
  createdDate?: string;
}

export enum AssignmentStatus {
  toDo = 'TO_DO',
  inProgress = 'IN_PROGRESS',
  done = 'DONE',
  canceled = 'CANCELED',
}
