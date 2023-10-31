<template>
  <VaLayout
      :top="{ fixed: true, order: 2 }"
      :left="{ fixed: true, absolute: true, order: 1, overlay: breakpoints.smDown && isSidebarVisible }"
      @left-overlay-click="isSidebarVisible = true"
  >
    <template #top>
      <VaNavbar shadowed>
        <template #left>
          <VaButton
              preset="secondary"
              :icon="isSidebarVisible ? 'menu_open' : 'menu'"
              @click="isSidebarVisible = !isSidebarVisible"
          />
          <va-image src="src/assets/LOGO.png" class="logo"/>
        </template>
        <template #center>
          <va-navbar-item>
            <div class="banner title">
             宿舍管理系统
            </div>
          </va-navbar-item>
        </template>
        <template #right>
          <va-navbar-item>
            <div class="banner">
              欢迎， {{ user.name }}！
            </div>
          </va-navbar-item>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="isSidebarVisible">
        <VaSidebarItem v-for="{ icon, title } in menu" :key="icon">
          <VaSidebarItemContent>
            <VaIcon :name="icon"/>
            <VaSidebarItemTitle>
              {{ title }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <main>
        <article>
          <div class="background-container">
            <div class="sub-container">
              <div>
                <va-button class="link-button">宿舍列表</va-button>
              </div>
              <div>
                <va-button class="link-button">广场</va-button>
              </div>
            </div>

            <div class="right-container">

            </div>
          </div>
        </article>
      </main>
    </template>
  </VaLayout>
</template>

<script>
import {ref, onMounted, watchEffect} from "vue";
import {useBreakpoint} from "vuestic-ui";
export default {
  name: "StudentMain",
  data() {
    const user = ref({
      name: "苏苏",
      sid: 12110000
    })

    const breakpoints = useBreakpoint()

    const isSidebarVisible = ref(breakpoints.mdUp)

    watchEffect(() => {
          isSidebarVisible.value = breakpoints.smUp
        }
    )

    const menu = [
      {icon: 'account_circle', title: '个人信息'},
      {icon: 'group', title: '我的队伍'},
      {icon: 'email', title: 'Email'},
      {icon: 'settings', title: '设置'},
      {icon: 'logout', title: '退出登录'},
    ]
  }
}
</script>

<style scoped>
.banner {
  align-items: center;
  display: flex;
}

.background-container {
  height: 100%;
  width: 100%;
  position: relative;
  background: whitesmoke;
}

.link-button {
  width: 250px;
  margin: 10px;
}

.sub-container {
  margin: auto;
}

.right-container {
  flex: 1;
  width: 50%;
}

.logo {
  width: 140px;
  height: 35px;
  border: 0;
  margin-left: 10px;
}

.title {
  text-align: center;
  font-size: 25px;
  font-family: 华光准圆_CNKI, serif;
}

.login-form {
  margin: 50px;
  text-align: center;
}
</style>
