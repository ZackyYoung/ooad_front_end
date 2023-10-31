import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import StudentMain from "../components/StudentMain.vue";
import TeacherMain from "../components/TeacherMain.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/student',
        name: 'StudentMain',
        component: StudentMain,
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
