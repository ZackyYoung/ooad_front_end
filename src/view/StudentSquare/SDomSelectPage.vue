<script setup>

import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";

import {s_square_sidebar_items} from "@/utils/SBarItems.js";

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_square_sidebar_items" :active_id=0 class="sidebar"/>
      <div class="page-content">
        <!--TODO:-->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
