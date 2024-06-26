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
    {
        path: "/:pathMatch(.*)*",
        name: 'notfound',
        component: () => import('./../views/NotFound.vue'),
    },
    {
        path: "/contacts/:id",
        name: 'contact.edit',
        component: () => import('./../views/ContactEdit.vue'),
        props: true,
    },
    {
        path: '/contacts',
        name: 'contact.add',
        component: () => import('./../views/ContactAdd.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
