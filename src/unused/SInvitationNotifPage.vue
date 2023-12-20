<script setup>
import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import InvitationNotif from "@/unused/InvitationNotif.vue";

import {s_notif_sidebar_items} from "@/utils/SBarItems.js";

import {useAccountStore} from "@/store/account.js";


const accountStore = useAccountStore()

</script>

<template>
  <div class="page-wrapper">
    <StudentHeader class="header"/>
    <div class="page-container">
      <SideBar :sidebar-items="s_notif_sidebar_items" :active_id=1 class="sidebar"/>
      <div class="page-content">
        <InvitationNotif/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
