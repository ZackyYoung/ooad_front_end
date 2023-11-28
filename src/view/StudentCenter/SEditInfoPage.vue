<script setup>
import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import StudentEditInfo from "@/components/student/center/StudentEditInfo.vue";

import {s_center_sidebar_items} from "@/utils/SBarItems.js";

import {useAccountStore} from "@/store/account.js";


const accountStore = useAccountStore()

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_center_sidebar_items" :active_id=1 class="sidebar"/>
      <div class="page-content">
        <StudentEditInfo/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
