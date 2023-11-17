<template>
  <router-view></router-view>
</template>
<script>
import mainPage from "@/view/MainPage.vue";
import StudentCenterPage from "@/view/StudentCenterPage.vue";
import TeacherMain from "@/view/TeacherMain.vue";
export default {
  name: 'App',
  components: {
    mainPage,
    StudentCenterPage,
    TeacherMain
  }
}
</script>

<style>
</style>
