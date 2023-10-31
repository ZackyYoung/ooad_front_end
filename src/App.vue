<template>
  <router-view></router-view>
</template>
<script>
import mainPage from './components/MainPage.vue'
import StudentMain from "./components/StudentMain.vue";
import TeacherMain from "./components/TeacherMain.vue";
export default {
  name: 'App',
  components: {
    mainPage,
    StudentMain,
    TeacherMain
  }
}
</script>

<style>
</style>
