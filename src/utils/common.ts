import { MIN_DATE_DIFF } from '@constants/common';

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

export const getCurrentGlobalDate = (date?: string) => {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const day = getZeroToDate(parsedDate.getDate());
  const month = getZeroToDate(parsedDate.getMonth() + 1);

  return `${year}-${month}-${day}`;
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
