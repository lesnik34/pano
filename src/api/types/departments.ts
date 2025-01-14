import { BaseListWrapperI } from './common';

export type DepartmentsListResI = BaseListWrapperI<DepartmentI>;

export interface DepartmentsListQueryI {
  page?: number;
  size?: number;
  search?: string;
}

export interface DepartmentI {
  id: string;
  title: string;
  description?: string;
}

export interface NewDepartmentI {
  title: string;
  description?: string;
}
export interface EditDepartmentI {
  id: string;
  title: string;
  description?: string;
}
