<script setup>
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import SideBar from "@/components/SideBar.vue";
import EditPickTime from "@/components/teacher/DomManage/EditPickTime.vue";

import {t_dom_sidebar_items} from "@/utils/TBarItems.js";


</script>

<template>
  <div class="page-wrapper">
    <TeacherHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="t_dom_sidebar_items" :active_id=2 class="sidebar"/>
      <div class="page-content">
        <EditPickTime/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
