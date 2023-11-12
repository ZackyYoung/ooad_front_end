<template>
  <StudentTeamPage/>
</template>
<script>
import mainPage from './components/MainPage.vue'
import StudentCenterPage from "@/view/StudentCenterPage.vue";
import StudentTeamPage from "@/view/StudentTeamPage.vue";

export default {
  name: 'App',
  components: {
    StudentCenterPage,
    StudentTeamPage,
    mainPage
  }
}
</script>

<style>
</style>
