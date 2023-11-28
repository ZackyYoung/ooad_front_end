<script setup>
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import SideBar from "@/components/SideBar.vue";
import TeacherEditPasswd from "@/components/teacher/Center/TeacherEditPasswd.vue";

import {t_center_sidebar_items} from "@/utils/TBarItems.js";



</script>

<template>
  <div class="page-wrapper">
    <TeacherHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="t_center_sidebar_items" :active_id=0 class="sidebar"/>
      <div class="page-content">
        <TeacherEditPasswd/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
