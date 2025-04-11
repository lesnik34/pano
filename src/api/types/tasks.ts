import { BaseListWrapperI, ComplexityType, PriorityEnum } from './common';
import { DepartmentI } from './departments';
import { UserI } from './users';

export type TasksListResI = BaseListWrapperI<ShortTaskI>;

export interface TasksListQueryI {
  page?: number;
  statuses?: Array<string>;
  size?: number;
  executor?: number;
  creator?: number;
  search?: string;
}

export interface TaskI {
  id: string;
  status: TaskStatus;
  title?: string;
  description?: string;
  department?: DepartmentI;
  executor: UserI;
  creator: UserI;
  createdDate?: string;
  complexity: ComplexityType;
  priority: PriorityEnum;
  endDate?: string;
}

export interface NewTaskI {
  title: string;
  description: string;
  department?: string;
  executor?: number;
  creator?: number;
  complexity: ComplexityType;
  priority: PriorityEnum;
  endDate?: string;
}
export interface EditTaskI {
  id: string;
  title: string;
  description?: string;
  department?: string;
  executor?: number;
  creator?: number;
  complexity: ComplexityType;
  priority: PriorityEnum;
  endDate?: string;
}

export interface ShortTaskI {
  id: string;
  status: TaskStatus;
  title?: string;
  description?: string;
  department?: DepartmentI;
  creator: UserI;
  executor: UserI;
  createdDate?: string;
  complexity: ComplexityType;
  priority: PriorityEnum;
  endDate?: string;
}

export enum TaskStatus {
  toDo = 'TO_DO',
  inProgress = 'IN_PROGRESS',
  done = 'DONE',
  canceled = 'CANCELED',
}
