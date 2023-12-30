<script setup>

import StudentHeader from "@/components/student/StudentHeader.vue";
import Chat from "@/components/student/message/Chat.vue";
import NotifSidebar from "@/components/student/message/NotifSidebar.vue";

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <NotifSidebar :active-side-id="1"/>
      <div class="page-content">
        <Chat/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
