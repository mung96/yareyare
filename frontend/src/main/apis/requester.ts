import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import {getAccessToken} from '@/main/services/helper/member/member.ts';
import {SERVER_BASE_URL} from '@env';

export const apiRequester: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
});

//기본 설정 넣고, header만 설정하는 로직이네
const setRequestDefaultHeader = async (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };
  return config as InternalAxiosRequestConfig;
};
const setRequestAuthorizationHeader = async (
  requestConfig: AxiosRequestConfig,
) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${await getAccessToken()}`,
    // Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6ImFiZGE2MDY1LTA3YWMtNDg1MC05MTQ0LWFhMjgwZmNjNmU4YSIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJ3d3cuc2Ftc3VuZy5jb20iLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNzMxNTUwMDcxfQ.r09u7TE9IQ0YkIkWAcQ0miMunXgGmsqTg58OhZP7owIbLGV67ev6OGG-9TiJRR8h0MZYI88C22tUafeiEyFznA'}`,
  };
  return config as InternalAxiosRequestConfig;
};

apiRequester.interceptors.request.use(async request => {
  await setRequestDefaultHeader(request);
  await setRequestAuthorizationHeader(request);
  return request;
});

apiRequester.interceptors.response.use(
  response => {
    // 응답 데이터를 그대로 반환
    // console.log('Response Data:', response.data);
    return response;
  },
  error => {
    if (isAxiosError(error)) {
      console.group('에러다.');
      console.log('요청url: ' + error.request._url);
      console.log(error.response?.data);
      console.groupEnd();
    }
    return Promise.reject(error);
  },
);

// export const nonLoginApiRequester: AxiosInstance = axios.create({
//   baseURL: SERVER_BASE_URL,
//   timeout: 5000,
// });

// nonLoginApiRequester.interceptors.request.use(setRequestDefaultHeader);
// nonLoginApiRequester.interceptors.response.use(
//   response => {
//     // 응답 데이터를 그대로 반환
//     // console.log('Response Data:', response.data);
//     return response;
//   },
//   error => {
//     if (isAxiosError(error)) {
//       console.log(error.response?.data);
//     }
//     return Promise.reject(error);
//   },
// );
