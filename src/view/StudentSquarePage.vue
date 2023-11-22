<script setup lang="ts">

import StudentHeader from "@/components/student/StudentHeader.vue";
import SideBar from "@/components/SideBar.vue";
import {ref} from "vue";


const ground_sidebar_items = [
  {title: "房子查看", icon: "king_bed"},
  {title: "选择舍友", icon: "group_add"}
];

const centerActiveOption = ref(ground_sidebar_items[0].title);

function updateOption(option: string) {
  centerActiveOption.value = option;
}

</script>

<template>
  <div class="square-wrapper">
    <StudentHeader class="header"/>
    <div class="square-container">
      <SideBar :sidebar-items="ground_sidebar_items" @updateOption="updateOption" class="sidebar"/>
      <div class="square-content">
      </div>
    </div>
  </div>
</template>

<style scoped>
.square-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    height: 100%;
  }


  .square-container {
    display: flex;
    height: 100%;

    .sidebar {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      height: 100%;
    }

    .square-content {
    //float: right; flex-grow: 1; flex-shrink: 1; height: 100%;
    }
  }
}
</style>
