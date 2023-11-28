<script setup>

import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";

import {s_team_sidebar_items} from "@/utils/SBarItems.js";
import {useAccountStore} from "@/store/account.js";
import MemberInvitation from "@/components/student/team/MemberInvitation.vue";

const accountStore = useAccountStore()

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_team_sidebar_items" :active_id=3 class="sidebar"/>
      <div class="page-content">
        <MemberInvitation/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
