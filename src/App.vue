<template>
  <router-view></router-view>
</template>
<script>
import mainPage from './view/MainPage.vue'
import StudentMain from "./view/StudentMain.vue";
import TeacherMain from "./view/TeacherMain.vue";
export default {
  name: 'App',
  components: {
    mainPage
  }
}
</script>

<style>
</style>
