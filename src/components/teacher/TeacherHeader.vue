<template>
  <div class="header">
    <div class="left">
      <div class="container" @click="toMain">
        <va-image class="logo" :src="logoName"/>
        <p class="title">
          研究生宿舍选择管理端
        </p>
      </div>
    </div>
    <div class="center">

    </div>
    <div class="right">
      <p class="welcome">
        欢迎，管理员：{{ accountStore.accountCampusId }}
      </p>
      <va-button
          v-for="(item, index) in t_head_bar_items"
          :key="index"
          class="mr-1"
          preset="secondary"
          :to="item.router_path"
      >
        {{ item.text }}
        <va-icon class="ml-1" :name="item.icon"/>
      </va-button>
      <va-button class="logout" @click="logout">
        <va-icon name="logout"/>
      </va-button>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import logoName from '@/assets/images/logo_name.png'
import {useAccountStore} from "@/store/account.js"
import {useRouter} from "vue-router"
import {t_head_bar_items} from "@/utils/TBarItems.js";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";

const accountStore = useAccountStore()
const notificationStore = useNotificationStore()
const messageStore = useMessageStore()
const router = useRouter()

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
})

function toMain(){
  router.push('/teacher')
}

function logout () {
  notificationStore.notificationWebsocketClose()
  messageStore.messageStoreClose()
  window.sessionStorage.clear()
  router.push('/')
}

onMounted(async ()=>{
  await accountStore.refreshSession()
})
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

