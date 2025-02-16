import { NextFunction, Request, Response } from 'express';

export const wait = (ms: number) => (req: Request, res: Response, next: NextFunction) => {
  setTimeout(next, ms);
};

export const resConstructor = {
  success: <T>(data: T) => ({
    status: true,
    body: data,
  }),
  error: (code?: string, message?: string) => ({
    status: false,
    error: {
      code,
      message,
    },
  }),
};

export const filterTasks = (tasks, params) => {
  const { creator, executor, statuses, search } = params;
  const currentStatuses = statuses?.split(',');

  return [...tasks].filter((task) => {
    let flag = true;

    if (creator && String(task?.creator?.id) !== String(creator)) {
      flag = false;
    }

    if (executor && String(task?.executor?.id) !== String(executor)) {
      flag = false;
    }

    if (!currentStatuses.includes(task?.status)) {
      flag = false;
    }

    if (search && !task?.title?.toLowerCase()?.includes(search)) {
      flag = false;
    }

    return flag;
  });
};
