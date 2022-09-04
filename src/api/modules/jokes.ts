import service from '@/api/httpJokes';

const serviceJokes = {
  getData: () => service.getjokes(),
};

export default serviceJokes;
