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
    Authorization: `Bearer ${await getAccessToken()}`,
  };

  return config as InternalAxiosRequestConfig;
};

apiRequester.interceptors.request.use(setRequestDefaultHeader);

apiRequester.interceptors.response.use(
  response => {
    // 응답 데이터를 그대로 반환
    // console.log('Response Data:', response.data);
    return response;
  },
  error => {
    if (isAxiosError(error)) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);
