<script setup lang="ts">

import StudentHeader from "@/components/student/StudentHeader.vue";
import TeamInfo from "@/components/student/TeamInfo.vue";
import SideBar from "@/components/SideBar.vue";
import {ref} from "vue";
import MemberManage from "@/components/student/team/MemberManage.vue";
import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import CreateUser from "@/components/teacher/UserManage/CreateUser.vue";


const team_sidebar_items = [
  {title: "创建学生", icon: "person_add"},
  {title: "编辑学生", icon: "account_box"},
];

const centerActiveOption = ref(team_sidebar_items[0].title);

function updateOption(option: string) {
  centerActiveOption.value = option;
}
</script>

<template>
  <div class="user-manage-wrapper">
    <TeacherHeader class="header"/>
    <div class="user-manage-container">
      <SideBar :sidebar-items="team_sidebar_items" @updateOption="updateOption" class="sidebar"/>
      <div class="user-manage-content">
        <CreateUser v-if="centerActiveOption==='创建学生'"/>
        <MemberManage v-if="centerActiveOption==='成员管理'"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-manage-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    height: 100%;
  }


  .user-manage-container {
    display: flex;
    height: 100%;

    .sidebar {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      height: 100%;
    }

    .user-manage-content {
    //float: right; flex-grow: 1; flex-shrink: 1; height: 100%;
    }
  }
}
</style>