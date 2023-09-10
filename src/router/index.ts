// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
	{
		path: '/pessoa',
		name: 'Pessoa',
		component: () => import('@/views/Pessoa.vue'),
	},
	{
		path: '/usuario',
		name: 'Usuário',
		component: () => import('@/views/Usuario.vue'),
	},
	{
		path: '/papel',
		name: 'Papel',
		component: () => import('@/views/Papel.vue'),
	},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
