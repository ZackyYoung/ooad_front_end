<script setup>
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import SideBar from "@/components/SideBar.vue";
import EditDom from "@/components/teacher/DomManage/EditDom.vue";

import {t_dom_sidebar_items} from "@/utils/TBarItems.js";


</script>

<template>
  <div class="page-wrapper">
    <TeacherHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="t_dom_sidebar_items" :active_id=1 class="sidebar"/>
      <div class="page-content">
        <EditDom/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
