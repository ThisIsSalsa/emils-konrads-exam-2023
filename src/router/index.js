import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '../stores/auth'; 
import Login from '@/views/Login.vue'; 
import Songs from '@/views/Songs.vue'; 
import Albums from '@/views/Album.vue'; 
import About from '@/views/About.vue'; 

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
      path: '/',
      name: 'Songs',
      component: Songs,
  },
  {
      path: '/albums',
      name: 'Albums',
      component: Albums,
  },
  {
      path: '/about',
      name: 'About',
      component: About,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  console.log(isAuthenticated);
  console.log(to.path);
  if (isAuthenticated && to.path === '/login') {
    return '/';
  }

  if (!isAuthenticated && to.path !== '/login') {
    return '/login';
  }
});

export default router;