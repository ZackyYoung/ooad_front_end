<script setup lang="ts">

import {s_square_sidebar_items} from "@/utils/SBarItems";
import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import StudentRoomInfo from "@/components/student/square/StudentRoomInfo.vue";

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_square_sidebar_items" active_id="0" class="sidebar"/>
      <div class="page-content">
        <student-room-info/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
