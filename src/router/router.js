import {createRouter, createWebHashHistory} from 'vue-router';
import MainPage from '@/view/MainPage.vue';
import SEditPasswdPage from "@/view/StudentCenter/SEditPasswdPage.vue";
import SInfoPage from "@/view/StudentCenter/SInfoPage.vue";
import STeamInfoPage from "@/view/StudentTeam/STeamInfoPage.vue";
import SMemberManagePage from "@/view/StudentTeam/SMemberManagePage.vue";
import STeamFavorPage from "@/view/StudentTeam/STeamFavorPage.vue";
import SMateSelectPage from "@/view/StudentSquare/SMateSelectPage.vue";
import SDomSelectPage from "@/view/StudentSquare/SDomSelectPage.vue";
import TDomCreatePage from "@/view/TeacherDoms/TDomCreatePage.vue";
import TDomEditPage from "@/view/TeacherDoms/TDomEditPage.vue";
import TDomTimePage from "@/view/TeacherDoms/TDomTimePage.vue";
import TUserCreatePage from "@/view/TeacherUsers/TUserCreatePage.vue";
import TUserEditPage from "@/view/TeacherUsers/TUserEditPage.vue";
import TEditPasswdPage from "@/view/TeacherCenter/TEditPasswdPage.vue";
import SEditInfoPage from "@/view/StudentCenter/SEditInfoPage.vue";
import SCommentNotifPage from "@/view/StudentNotif/SCommentNotifPage.vue";
import SInvitationNotifPage from "@/unused/SInvitationNotifPage.vue";
import STeamInvitationPage from "@/view/StudentTeam/STeamInvitationPage.vue";
import STeamSelect from "@/view/StudentSquare/STeamSelect.vue";
import SDomInfoPage from "@/view/StudentSquare/SDomInfoPage.vue";
import TDomInfo from "@/view/TeacherDoms/TDomInfo.vue";
import SChatPage from "@/view/StudentSquare/SChatPage.vue";
import SDomPage from "@/view/StudentCenter/SDomPage.vue";
import {ref} from "vue";

export const showMap = ref(true);

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
        component: SInfoPage,
        meta: {
            reload: true
        }
    },
    {
        path: '/teacher',
        name: 'TeacherMain',
        component: TEditPasswdPage,
        meta: {
            reload: true
        }
    },

    {
        path: '/student/center/info',
        name: 'SInfo',
        component: SInfoPage,
    },
    {
        path: '/student/center/edit',
        name: 'SEditInfo',
        component: SEditInfoPage,
    },
    {
        path: '/student/center/password',
        name: 'SEditPassword',
        component: SEditPasswdPage,
    },
    {
        path: '/student/center/room',
        name: 'SRoom',
        component: SDomPage,
    },


    {
        path: '/student/team/info',
        name: 'STeamInfo',
        component: STeamInfoPage,
    },
    {
        path: '/student/team/manage',
        name: 'STeamManage',
        component: SMemberManagePage,
    },
    {
        path: '/student/team/favor',
        name: 'STeamFavor',
        component: STeamFavorPage
    },
    {
        path: '/student/team/invitation',
        name: 'STeamInvitation',
        component: STeamInvitationPage
    },


    {
        path: '/student/square/dormitory',
        name: 'SDomSelect',
        component: SDomSelectPage,
        beforeRouteLeave(to, from, next) {
            showMap.value = true;
            next();
        },
    },
    {
        path: '/student/square/dormitory/roomInfo',
        name: 'SDomInfoPage',
        component: SDomInfoPage
    },

    {
        path: '/student/square/schoolmate',
        name: 'SMateSelect',
        component: SMateSelectPage
    },

    {
        path: '/student/square/teamSelect',
        name: 'STeamSelect',
        component: STeamSelect
    },

    {
        path: '/student/notification/message',
        name: 'SCommentNotif',
        component: SCommentNotifPage
    },
    {
        path: '/student/notification/chat',
        name: 'SChatPage',
        component: SChatPage
    },
    {
        path: '/student/notification/invitation',
        name: 'SInvitationNotif',
        component: SInvitationNotifPage
    },


    {
        path: '/teacher/center/password',
        name: 'TEditPasswd',
        component: TEditPasswdPage
    },
    {
        path: '/teacher/user/create',
        name: 'TUserCreate',
        component: TUserCreatePage
    },
    {
        path: '/teacher/user/edit',
        name: 'TUserEdit',
        component: TUserEditPage
    },


    {
        path: '/teacher/dormitory/create',
        name: 'TDomCreate',
        component: TDomCreatePage
    },
    {
        path: '/teacher/dormitory/edit',
        name: 'TDomEdit',
        component: TDomEditPage
    },
    {
        path: '/teacher/dormitory/roomInfo',
        name: 'TDomInfo',
        component: TDomInfo
    },
    {
        path: '/teacher/dormitory/time',
        name: 'TDomTime',
        component: TDomTimePage
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

let previousRoute;
router.beforeEach((to, from, next)=>{
    if(to.path === '/')  return next()
    const tokenStr = window.sessionStorage.getItem("campusId")
    if(!tokenStr) return next('/')
    if(from.path === '/student/square/dormitory/roomInfo' &&
        to.path === '/student/square/dormitory' &&
        (previousRoute.path === '/student/center/room' ||
            previousRoute.path === '/student/team/favor' ||
            previousRoute.path === '/student/notification/message'
        ))
        return next(previousRoute.path)
    previousRoute = from
    next()
})


export default router;
