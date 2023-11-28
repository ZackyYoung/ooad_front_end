<template>
  <va-sidebar
      class="sidebar flex"
      :minimized="minimized"
      width="11rem"
      minimized-width="64px"
  >
    <div class="sidebar_options flex">
      <template
          v-for="item in items"
          :key="item.title"
      >
        <va-sidebar-item
            :active="item.title===activeElement"
            @click="activeElement = item.title; updateActive(item.router_path)">
          <va-sidebar-item-content>
            <va-icon :name="item.icon"/>
            <va-sidebar-item-title>
              {{ item.title }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </template>

      <va-spacer/>

      <va-sidebar-item @click="minimized=!minimized">
        <va-sidebar-item-content>
          <va-icon :name="minimized?'arrow_right':'arrow_left'"/>
          <va-sidebar-item-title>
            收起列表
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </div>
  </va-sidebar>
</template>

<script setup lang="ts">
import {ref, defineEmits, readonly} from "vue";
import {SidebarItemType} from "@/utils/types/type";
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps<{
  sidebarItems: SidebarItemType[],
  active_id: number
}>();
const items = readonly(props.sidebarItems)
const x = props.active_id;
const activeElement = ref(items[props.active_id].title);
const minimized = ref(false);

function updateActive(link: string) {
  console.log('router by side bar:' + link);
  router.push(link);
}
</script>

<style scoped>
.sidebar {
  font-family: var(--va-font-family);
  height: 50vh;
}
</style>