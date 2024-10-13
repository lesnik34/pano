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
