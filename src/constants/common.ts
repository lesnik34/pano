export const DEFAULT_ERROR_CODE = '0000';

export const LOCAL_KEYS = {
  AUTH: 'AUTH_DATA',
};

export const MIN_DATE_DIFF = 2 * 24 * 60 * 60 * 60;

export const TASK_STATUSES = ['DONE', 'IN_PROGRESS', 'TO_DO', 'CANCELED'];

export const EMPTY_TASK = {
  status: 'TO_DO',
  title: '',
  description: '',
  executor: '',
  creator: '',
  date_start: '',
  date_end: '',
};
