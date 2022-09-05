import service from '@/api/http';

const serviceApi = {
  // 验证登录实例
  postVerification: (params: object) => service.post(`/login`, params),
  getData: (params: string) => service.get(`/${params}`),
};

export default serviceApi;
