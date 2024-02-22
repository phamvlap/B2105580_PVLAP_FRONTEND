import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'contactbook',
        component: () => import('./../views/ContactBook.vue'),
    },
    {
        path: '/register',
        name: 'user.register',
        component: () => import('./../views/UserRegister.vue'),
    },
    {
        path: '/login',
        name: 'user.login',
        component: () => import('./../views/UserLogin.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
