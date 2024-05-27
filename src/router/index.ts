import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '',
          component: Home,
          name: 'Home',
        }
      ],
    }, {
      path: '/favourites',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: () => import('../views/Favourites.vue'),
          name: 'Favourites',
        }
      ],
    }, {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
  ]
})

export default router;
