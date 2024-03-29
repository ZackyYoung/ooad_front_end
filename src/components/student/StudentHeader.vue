<template>
  <div class="header">
    <div class="left">
      <div class="container" @click="toMain">
        <va-image class="logo" :src="logoName"/>
        <p class="title">
          研究生宿舍选择系统
        </p>
      </div>
    </div>
    <div class="center">

    </div>
    <div class="right">
      <p class="welcome">
        欢迎，{{ accountStore.accountCampusId }}
      </p>
      <va-avatar
          :src="pictureStore.userAvatar"
          fallback-src="src/assets/avatar1.png"
      />
      <va-button
          v-for="(item, index) in s_head_bar_items"
          :key="index"
          class="mr-1"
          preset="secondary"
          :to="item.router_path"
      >
        {{ item.text }}
        <va-icon class="ml-1" :name="item.icon"/>
      </va-button>
      <va-button
          class="mr-1"
          preset="secondary"
          to="/student/notification/message"
      >
        消息中心
        <span v-if="hasNew">
          <va-badge
              overlap
              dot
          >
          <va-icon
              class="ml-1"
              name="notifications_active"
          />
          </va-badge>
        </span>
        <span v-else>
          <va-icon
              class="ml-1"
              name="notifications"
          />
        </span>
      </va-button>


      <va-button class="logout" @click="onLogoutClick()">
        <va-icon name="logout"/>
      </va-button>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import {useModal, useToast} from 'vuestic-ui'

import logoName from '@/assets/images/logo_name.png'
import {useAccountStore} from "@/store/account";
import {useRouter} from "vue-router";
import {s_head_bar_items} from "@/utils/SBarItems.js";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";
import {usePictureStore} from "@/store/picture.js";

const accountStore = useAccountStore()
const notificationStore = useNotificationStore()
const messageStore = useMessageStore()
const pictureStore = usePictureStore()
const router = useRouter()

const {confirm} = useModal()
const {init} = useToast()

async function onLogoutClick() {
  const result = await confirm({
    message: '您确定要退出登录吗',
    title: '退出登录?',
    okText: "确定",
    cancelText: "取消",
  })

  if (result) {
    logout()
    init('退出登录')
  } else {
    init('取消退出操作')
  }
}

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await pictureStore.fetchAvatar(accountStore.accountCampusId)
})

const hasNewMessage = ref(computed(() => messageStore.hasUnreadMessage(accountStore.accountCampusId)))
const hasNewNotif = ref(computed(() => hasNewCompute(notificationStore.notificationData)))

function hasNewCompute(notificationData) {
  for (const notification of notificationData) {
    if (!notification.read) {
      return true
    }
  }
  return false;
}

const hasNew = computed(() => (hasNewNotif.value || hasNewMessage.value))

function toMain() {
  router.push('/student')
}

function logout() {
  notificationStore.notificationStoreClose()
  messageStore.messageStoreClose()
  pictureStore.pictureStoreClose()
  window.sessionStorage.clear()
  router.push('/')
}
</script>


<style scoped lang="scss">
.header {
  display: grid;
  grid-template: "left center right" / 1fr auto 1fr;
  align-items: center;
  transition: transform 0.5s ease;
  position: relative;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
  background-color: #ffffff;
  font-family: var(--va-font-family);
  top: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  z-index: calc(1000 - 100);

  .left {
    display: flex;
    grid-area: left;
    align-items: center;
    flex-grow: 1;

    .container {
      display: flex;
      align-items: center;
      cursor: pointer;

      .logo {
        float: left;
        height: 50px;
        width: 200px;
      }

      .title {
        margin-left: 1rem;
        font-size: 1.5rem;
        font-family: HGY3, serif;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .center {
    display: flex;
    justify-content: center;
    grid-area: center;
  }

  .right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    grid-area: right;
    align-items: center;

    .welcome {
      text-align: center;
      margin-right: 2rem;
      font-size: 1rem;
      cursor: default;
    }

    .logout {
      margin-left: 2rem;
    }
  }
}
</style>

