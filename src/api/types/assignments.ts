import { BaseListWrapperI, ComplexityType, PriorityEnum } from './common';
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
  complexity: ComplexityType;
  priority: PriorityEnum;
  createdDate?: string;
}

export interface NewAssignmentI {
  title: string;
  description?: string;
  department?: string;
  executor?: number;
  creator?: number;
  complexity: ComplexityType;
  priority: PriorityEnum;
}
export interface EditAssignmentI {
  id: string;
  title: string;
  description?: string;
  department?: string;
  executor?: number;
  creator?: number;
  complexity: ComplexityType;
  priority: PriorityEnum;
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
  complexity: ComplexityType;
  priority: PriorityEnum;
}

export enum AssignmentStatus {
  toDo = 'TO_DO',
  inProgress = 'IN_PROGRESS',
  done = 'DONE',
  canceled = 'CANCELED',
}
