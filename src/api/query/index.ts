import { usersApi, useGetUserByIdQuery } from './users';
import { tasksApi, useGetTasksQuery, useGetTaskQuery } from './tasks';
import { departmentsApi, useGetDepartmentsQuery } from './departments';

export default {
  usersApi,
  tasksApi,
  departmentsApi,
  useGetDepartmentsQuery,
  useGetUserByIdQuery,
  useGetTasksQuery,
  useGetTaskQuery,
};
