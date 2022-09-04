import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import showCodeMessage from '@/api/code';
// import { formatJsonToUrlParams, instanceObject } from '@/utils/format';

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL_JOKES;

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    ElMessage.info(JSON.stringify(response.status));
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      ElMessage.error(showCodeMessage(response.status));
      return Promise.reject(response.data);
    }
    ElMessage.warning('Houve um erro nesta requisição.');
    return Promise.reject(error);
  },
);
const service = {
  getjokes<T = any>(): Promise<T> {
    return axiosInstance.get('api', { params: { query: { format: 'json' } } });
  },
};

export default service;
