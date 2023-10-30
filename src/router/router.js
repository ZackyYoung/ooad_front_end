import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '../components/MainPage.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';


const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
]

const router = new VueRouter({
    routes
})
export default router;
