<script setup lang="ts">

import SideBar from "@/components/SideBar.vue";
import {ref} from "vue";

import TeacherHeader from "@/components/teacher/TeacherHeader.vue";
import CreateDom from "@/components/teacher/DomManage/CreateDom.vue";
import EditDom from "@/components/teacher/DomManage/EditDom.vue";
import EditPickTime from "@/components/teacher/DomManage/EditPickTime.vue";


const dom_manage_sidebar_items = [
  {title: "创建房间", icon: "add_circle"},
  {title: "编辑房间", icon: "real_estate_agent"},
  {title: "选房时间&导出", icon: "alarm"},
];

const domActiveOption = ref(dom_manage_sidebar_items[0].title);

function updateOption(option: string) {
  domActiveOption.value = option;
}
</script>

<template>
  <div class="dom-manage-wrapper">
    <TeacherHeader class="header"/>
    <div class="dom-manage-container">
      <SideBar :sidebar-items="dom_manage_sidebar_items" @updateOption="updateOption" class="sidebar"/>
      <div class="dom-manage-content">
        <CreateDom v-if="domActiveOption==='创建房间'"/>
        <EditDom v-if="domActiveOption==='编辑房间'"/>
        <EditPickTime v-if="domActiveOption=='选房时间&导出'"/>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dom-manage-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    height: 100%;
  }


  .dom-manage-container {
    display: flex;
    height: 100%;

    .sidebar {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      height: 100%;
    }

    .dom-manage-content {
    //float: right; flex-grow: 1; flex-shrink: 1; height: 100%;
    }
  }
}
</style>