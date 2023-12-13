<script setup>

import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";

import {s_team_sidebar_items} from "@/utils/SBarItems.js";
import {useAccountStore} from "@/store/account.js";
import TeamFavor from "@/components/student/team/TeamFavor.vue";

const accountStore = useAccountStore()

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_team_sidebar_items" :active_id=1 class="sidebar"/>
      <div class="page-content">
        <team-favor/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
