export type BaseResponseI<T> = BaseSuccessI<T> | BaseErrorI;

export interface BaseSuccessI<T> {
  status: true;
  body: T;
}

export interface BaseErrorI {
  status: false;
  error: {
    code?: string;
    title?: string;
    message?: string;
  };
}

export interface PagesSortI {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
