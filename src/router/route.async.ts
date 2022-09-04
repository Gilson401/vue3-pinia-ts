// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/poke',
    name: 'poke',
    meta: {
      title: 'poke',
      icon: '',
    },
    component: () => import('@/views/example/PokemonPage.vue'),
  },
  {
    path: '/poke/:id',
    name: 'poke',
    meta: {
      title: 'poke',
      icon: '',
    },
    component: () => import('@/views/example/PokemonPage.vue'),
  },
];

export default asyncRoutes;
