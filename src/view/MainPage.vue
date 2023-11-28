<template>

  <div class="background-container">
    <div class="mid-container">
      <div class="left-container">
        <va-image class="logo" src="src/assets/LOGO.png"/>
        <h1 class="title">研究生宿舍选择系统</h1>
        <va-tabs
            v-model="activeTab"
            grow
            center
        >
          <va-tab name="Login">
            Login
          </va-tab>
          <va-tab name="Register">
            Register
          </va-tab>
        </va-tabs>
        <login :form="loginForm" v-if="activeTab === 'Login' "/>
        <register :form="registerForm" v-if="activeTab === 'Register' "/>
      </div>
      <div class="right-container">
        <va-image src="src/assets/dormitory.png"></va-image>
      </div>
    </div>
  </div>
</template>

<script setup>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import {useAccountStore} from "@/store/account.js";
import {reactive, ref} from "vue";


const accountStore = useAccountStore()
const activeTab = ref("Login")
const registerForm = accountStore.registerForm
const loginForm = accountStore.loginForm

</script>

<style scoped>
.background-container {
  height: 100%;
  width: 100%;
  position: fixed;
  background: linear-gradient(to right, #dafdfc 50%, #10037c 50%);
}
.mid-container {
  display: flex;
  border-radius: 20px;
  height: 78%;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to right, white 50%, #eafdfd 50%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.left-container {
  flex: 1;
}

.right-container {
  flex: 1;
  text-align: right;
}
.logo {
  width: 300px;
  height: 90px;
  margin: 0 auto;
}
.title{
  margin-top: 10px;
  text-align: center;
  font-size: 30px;
  font-family: HGY3,serif;
}

</style>
