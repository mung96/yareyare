import {UseMutationOptions} from '@tanstack/react-query';

export type Response<T> = {
  header: {message: string};
  body: T;
};
export type MutationOptionsWithoutFn<Request, Response> = Omit<
  UseMutationOptions<Response, unknown, Request>,
  'mutationFn'
>;
