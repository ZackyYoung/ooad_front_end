<script setup>
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import SideBar from "@/components/SideBar.vue";
import EditUser from "@/components/teacher/UserManage/EditUser.vue";

import {t_user_sidebar_items} from "@/utils/TBarItems.js";


</script>

<template>
  <div class="page-wrapper">
    <TeacherHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="t_user_sidebar_items" :active_id=1 class="sidebar"/>
      <div class="page-content">
        <EditUser/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
