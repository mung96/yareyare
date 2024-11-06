import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {SERVER_BASE_URL} from '@env';
import {getAccessToken} from '@/main/services/helper/member/member.ts';

const apiRequest: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5000,
});

//기본 설정 넣고, header만 설정하는 로직이네
const setRequestDefaultHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return config as InternalAxiosRequestConfig;
};

apiRequest.interceptors.request.use(setRequestDefaultHeader);
