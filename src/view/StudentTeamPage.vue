<script setup lang="ts">

import StudentHeader from "@/components/student/StudentHeader.vue";
import TeamInfo from "@/components/student/TeamInfo.vue";
import StudentSideBar from "@/components/student/StudentSideBar.vue";
import StudentEditPasswd from "@/components/student/center/StudentEditPasswd.vue";
import {ref} from "vue";
import MemberManage from "@/components/student/team/MemberManage.vue";

const t1 = {
  team_id: 1,
  creator_id: 12110001,
  members: [
    {
      sid: 12110000,
      name: '苏苏',
      gender: 2,
      degree: 2021,
      major: '计算机科学与工程系',
      intro: '大家好'
    },
    {
      sid: 12110001,
      name: '南小科',
      gender: 1,
      degree: 2022,
      major: '电子系',
      intro: '大家坏'
    },
    {
      sid: 12110002,
      name: '玉群',
      gender: 1,
      degree: 2020,
      major: '软件工程',
      intro: '不想写ooad'
    },
    {
      sid: 12110003,
      name: '坤坤',
      gender: 1,
      degree: 2022,
      major: '物理系',
      intro: '开学了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
    },
  ],
}
const team_sidebar_items = [
  {title: "队伍资料", icon: "group"},
  {title: "成员管理", icon: "group_add"},
  {title: "队伍收藏", icon: "bookmark"},
];

const centerActiveOption = ref(team_sidebar_items[0].title);

function updateOption(option: string) {
  centerActiveOption.value = option;
}
</script>

<template>
  <div class="team-wrapper">
    <student-header class="header"/>
    <div class="team-container">
      <StudentSideBar :sidebar-items="team_sidebar_items" @updateOption="updateOption" class="sidebar"/>
      <div class="team-content">
        <TeamInfo :team-info="t1" v-if="centerActiveOption==='队伍资料'"/>
        <MemberManage :team-info="t1" v-if="centerActiveOption==='成员管理'"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    height: 100%;
  }


  .team-container {
    display: flex;
    height: 100%;

    .sidebar {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      height: 100%;
    }

    .team-content {
    //float: right; flex-grow: 1; flex-shrink: 1; height: 100%;
    }
  }
}
</style>