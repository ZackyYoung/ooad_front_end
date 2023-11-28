<script setup>
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import SideBar from "@/components/SideBar.vue";
import CreateDom from "@/components/teacher/DomManage/CreateDom.vue";

import {t_dom_sidebar_items} from "@/utils/TBarItems.js";


</script>

<template>
  <div class="page-wrapper">
    <TeacherHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="t_dom_sidebar_items" :active_id=0 class="sidebar"/>
      <div class="page-content">
        <CreateDom/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
