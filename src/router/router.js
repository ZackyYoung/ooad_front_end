import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../view/MainPage.vue';
import StudentCenterPage from "../view/StudentCenterPage.vue";
import TeacherMain from "../view/TeacherMain.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/student',
        name: 'StudentMain',
        component: StudentCenterPage,
    },
    {
        path: '/teacher',
        name: 'TeacherMain',
        component: TeacherMain
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
