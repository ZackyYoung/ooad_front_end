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
        欢迎，{{ userinfo.name }}
      </p>
      <va-button
          v-for="(link, index) in links"
          :key="index"
          class="mr-1"
          preset="secondary"
          :to="link.to"
          :href="link.url"
          :target="link.target"
      >
        {{ link.text }}
        <va-icon class="ml-1" :name="link.icon"/>
      </va-button>
      <va-button class="logout" @click="logout">
        <va-icon name="logout"/>
      </va-button>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from 'vue'
import logoName from '@/assets/images/logo_name.png'
import {useAccountStore} from "@/store/account";
import {useRouter} from "vue-router";
const accountStore = useAccountStore()
const router = useRouter()
const userinfo = reactive(
    {
      name: accountStore.accountName?accountStore.accountName:"学生1",
      sid: accountStore.studentInformationForm.studentId
    }
);

const links = computed(() => [
  {
    text: '广场',
    icon: 'local_mall',
    to: '',
  },
  {
    text: '个人中心',
    icon: 'account_circle',
    url: '',
    target: '_blank',
  },
  {
    text: '我的队伍',
    icon: 'group',
    to: '',
  },
  {
    text: '消息通知',
    icon: 'notifications',
    to: '',
  },
])

function logout () {
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

