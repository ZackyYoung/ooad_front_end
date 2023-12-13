<script setup lang="ts">

import {t_dom_sidebar_items} from "@/utils/TBarItems";
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import SideBar from "@/components/SideBar.vue";
import TeacherRoomInfo from "@/components/teacher/DomManage/TeacherRoomInfo.vue";
</script>

<template>
  <div class="page-wrapper">
    <TeacherHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="t_dom_sidebar_items" active_id="1" class="sidebar"/>
      <div class="page-content">
        <teacher-room-info/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
