import service from '@/api/httpPokemon';

const servicePokemon = {
  getData: (params: string) => service.get(`/${params}`),
};

export default servicePokemon;
