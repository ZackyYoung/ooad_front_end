<script setup>

import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import StudentInfo from "@/components/student/StudentInfo.vue";
import StudentEditPasswd from "@/components/student/center/StudentEditPasswd.vue";

import {ref} from "vue";
import {useAccountStore} from "@/store/account.js";
const accountStore = useAccountStore()

const center_sidebar_items = [
  {title: "我的资料", icon: "person"},
  {title: "编辑信息", icon: "manage_accounts"},
  {title: "修改密码", icon: "password"},
];

const s1 = {
  sid: 12110000,
  name: '苏苏',
  gender: 2,
  degree: 2021,
  major: '计算机科学与工程系',
  intro: '大家好'
};
const centerActiveOption = ref(center_sidebar_items[0].title);

function updateOption(option) {
  centerActiveOption.value = option;
}

</script>

<template>
  <div class="center-wrapper">
    <StudentHeader class="header"/>
    <div class="center-container">
      <SideBar :sidebar-items="center_sidebar_items" @updateOption="updateOption" class="sidebar"/>
      <div class="center-content">
        <StudentInfo v-bind="s1" v-if="centerActiveOption==='我的资料'"/>
        <StudentEditPasswd v-if="centerActiveOption==='修改密码'"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    height: 100%;
  }


  .center-container {
    display: flex;
    height: 100%;

    .sidebar {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      height: 100%;
    }

    .center-content {
    //float: right; flex-grow: 1; flex-shrink: 1; height: 100%;
    }
  }
}
</style>
