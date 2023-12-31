<script setup>
import StudentHeader from "@/components/student/StudentHeader.vue";
import Notification from "@/components/student/message/Notification.vue";

import {useAccountStore} from "@/store/account.js";
import NotifSidebar from "@/components/student/message/NotifSidebar.vue";


const accountStore = useAccountStore()

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <NotifSidebar :active-side-id="0"/>
      <div class="page-content">
        <Notification/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
