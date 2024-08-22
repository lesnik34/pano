import { TaskStatus } from '@api/types';
import { MIN_DATE_DIFF } from '@constants/common';
import i18n from './i18next';

export const getTaskStatusText = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.canceled:
      return i18n.t('task.status.canceled');
    case TaskStatus.done:
      return i18n.t('task.status.done');
    case TaskStatus.inProgress:
      return i18n.t('task.status.in.progress');
    case TaskStatus.toDo:
      return i18n.t('task.status.to.do');
    default:
      return '';
  }
};

const getZeroToDate = (number: number): string => {
  if (number < 10) {
    return `0${number || ''}`;
  }

  return `${number || ''}`;
};

export const getLocalDate = (date?: string) => {
  if (!date) {
    return date;
  }

  const parsedDate = new Date(date);

  const day = getZeroToDate(parsedDate.getDate());
  const month = getZeroToDate(parsedDate.getMonth() + 1);

  return `${day}.${month}`;
};

export const getDateRange = (start?: string, end?: string): string => {
  const startDate = getLocalDate(start);
  const endDate = getLocalDate(end);

  if (!startDate && !endDate) {
    return '';
  }

  return `${startDate || '...'} - ${endDate || '...'}`;
};

export const isDateSoon = (date?: string): boolean => {
  if (!date) {
    return false;
  }

  const parsedDate = new Date(date);
  const timeTill = parsedDate.getTime();
  const timeNow = new Date().getTime();
  const timeDiff = timeTill - timeNow;

  return timeDiff < MIN_DATE_DIFF;
};
