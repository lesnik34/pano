export type BaseResponseI<T> = BaseSuccessI<T> | BaseErrorI;

export interface BaseSuccessI<T> {
  status: true;
  body: T;
}

export interface BaseErrorI {
  status: false;
  error: {
    code: string;
    message: string;
  };
}

// export interface BaseResponseI<T> {
//   status: boolean;
//   body?: T;
//   error?: {
//     code: string;
//     message: string;
//   };
// }
