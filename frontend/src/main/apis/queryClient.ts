import {QueryClient} from '@tanstack/react-query';
import {isAxiosError} from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: error =>
        isAxiosError(error) && error.response?.status! === 401,
    },
    mutations: {
      retry: false,
      throwOnError: error =>
        isAxiosError(error) && error.response?.status! === 401,
    },
  },
});

export default queryClient;
