import {AxiosResponse} from 'axios';

type ResponseDto<T> = {
  header: {message: string};
  body: T;
};

export type Response<T> = AxiosResponse<ResponseDto<T>>;
