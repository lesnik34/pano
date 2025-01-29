import { usersApi, useGetUserByIdQuery } from './users';
import { tasksApi, useGetTasksQuery, useGetTaskQuery } from './tasks';
import { departmentsApi, useGetDepartmentsQuery } from './departments';
import { assignmentsApi, useGetAssignmentsQuery } from './assignments';

export default {
  usersApi,
  tasksApi,
  departmentsApi,
  assignmentsApi,
  useGetDepartmentsQuery,
  useGetAssignmentsQuery,
  useGetUserByIdQuery,
  useGetTasksQuery,
  useGetTaskQuery,
};
