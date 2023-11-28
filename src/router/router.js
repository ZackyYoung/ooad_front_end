import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/view/MainPage.vue';
import StudentCenterPage from "@/view/StudentCenterPage.vue";
import TeacherUserManagePage from "@/view/TeacherUserManagePage.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
        meta: {
            reload: true
        }
    },
    {
        path: '/student',
        name: 'StudentMain',
        component: StudentCenterPage,
    },
    {
        path: '/teacher',
        name: 'TeacherMain',
        component: TeacherUserManagePage
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
