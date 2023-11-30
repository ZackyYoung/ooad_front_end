<script setup>

import {s_square_sidebar_items} from "@/utils/SBarItems.js";
import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import StudentTeamSelect from "@/components/student/square/StudentTeamSelect.vue";
</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_square_sidebar_items" :active_id=2 class="sidebar"/>
      <div class="page-content">
        <StudentTeamSelect/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
