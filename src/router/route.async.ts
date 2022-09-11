// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
      icon: '',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/poke/:id?',
    name: 'poke',
    meta: {
      title: 'Pokemon',
      icon: '',
    },
    component: () => import('@/views/example/PokemonPage.vue'),
  },
  {
    path: '/jokes',
    name: 'jokes',
    meta: {
      title: 'Jokes',
      icon: '',
    },
    component: () => import('@/views/jokes/JokesPage.vue'),
  },
];

export default asyncRoutes;
