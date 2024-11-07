export type Response<T> = {
  header: {message: string};
  body: T;
};
