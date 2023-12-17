<script setup>

import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";

import {s_notif_sidebar_items, s_square_sidebar_items} from "@/utils/SBarItems.js";
import Chat from "@/components/student/square/Chat.vue";

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_notif_sidebar_items" :active_id=1 class="sidebar"/>
      <div class="page-content">
        <Chat/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
