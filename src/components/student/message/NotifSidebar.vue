<template>
  <va-sidebar
      class="sidebar flex"
      :minimized="minimized"
      width="11rem"
      minimized-width="64px"
  >
    <div class="sidebar_options flex">
      <va-sidebar-item
          :active="activeId===0"
          @click="activeId = 0; updateActive('/student/notification/message')">
        <va-sidebar-item-content>
            <span v-if="hasNewNotif">
              <va-badge
                  overlap
                  dot
              >
                <va-icon name="email"/>
              </va-badge>
            </span>
          <span v-else>
              <va-icon name="email"/>
            </span>
          <va-sidebar-item-title>
            消息通知
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-sidebar-item
          :active="activeId===1"
          @click="activeId = 1; updateActive('/student/notification/chat')">
        <va-sidebar-item-content>
            <span v-if="hasNewMessage">
              <va-badge
                  overlap
                  dot
              >
                <va-icon name="chat"/>
              </va-badge>
            </span>
          <span v-else>
              <va-icon name="chat"/>
            </span>
          <va-sidebar-item-title>
            在线聊天
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

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

<script setup>
import {ref, defineEmits, computed} from "vue";
import {useRouter} from "vue-router";
import {useAccountStore} from "@/store/account.js";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";

const props = defineProps(['activeSideId']);

const router = useRouter();

const accountStore = useAccountStore()
const notificationStore = useNotificationStore()
const messageStore = useMessageStore()

const hasNewMessage = ref(computed(() => messageStore.hasUnreadMessage(accountStore.accountCampusId)))
const hasNewNotif = ref(computed(() => hasNewCompute(notificationStore.notificationData)))
const activeId = ref(props.activeSideId);
const minimized = ref(false);

function hasNewCompute(notificationData) {
  for (const notification of notificationData) {
    if (!notification.read) {
      return true
    }
  }
  return false;
}

function updateActive(link) {

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