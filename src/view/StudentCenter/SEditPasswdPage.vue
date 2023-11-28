<script setup>
import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import StudentEditPasswd from "@/components/student/center/StudentEditPasswd.vue";

import {s_center_sidebar_items} from "@/utils/SBarItems.js";

import {useAccountStore} from "@/store/account.js";

const accountStore = useAccountStore()

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_center_sidebar_items" :active_id=2 class="sidebar"/>
      <div class="page-content">
        <StudentEditPasswd/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
