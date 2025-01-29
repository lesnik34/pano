import { NewTaskI } from '@api/types';

export const DEFAULT_ERROR_CODE = '0000';

export const LOCAL_KEYS = {
  AUTH: 'AUTH_DATA',
};

export const MIN_DATE_DIFF = 2 * 24 * 60 * 60 * 60;

export const MIN_LENGTH_INPUT = 3;

export const TASKS_LIST_LENGTH = 5;

export const DEPARTMENTS_LIST_LENGTH = 5;

export const ASSIGNMENTS_LIST_LENGTH = 5;

export const USERS_LIST_LENGTH = 5;

export const DEBOUNCE_TIME = 1500;

export const TASK_STATUSES = ['DONE', 'IN_PROGRESS', 'TO_DO', 'CANCELED'];

export const EMPTY_TASK: NewTaskI = {
  title: '',
  description: '',
};
