<template>
  <router-view></router-view>
</template>
<script>
import mainPage from "@/view/MainPage.vue";
import StudentCenterPage from "@/view/StudentCenterPage.vue";
import TeacherUserManagePage from "@/view/TeacherUserManagePage.vue";
export default {
  name: 'App',
  components: {
    mainPage,
    StudentCenterPage,
    TeacherUserManagePage
  }
}
</script>

<style>
</style>
