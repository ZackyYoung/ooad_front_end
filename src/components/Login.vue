<template>
  <va-form class="login-form" ref="loginForm">
    <div>
      <va-icon name="account_circle"></va-icon>
      <va-input
          style="margin: 5px; text-align: left;"
          v-model="form.campusId"
          label="CAMPUS ID"
          placeholder="请输入校园号"
          :rules="[(value) => (value && value.length > 0) || 'Campus id is required']"
          clearable
      />
    </div>
    <div>
      <va-value
          v-slot="isPasswordVisible"
          :default-value="false"
      >
        <va-icon name="key"></va-icon>
        <va-input
            style="margin: 5px; text-align: left"
            v-model="form.password"
            :type="isPasswordVisible.value ? 'text' : 'password'"
            label="PASSWORD"
            placeholder="请输入密码"
            :rules="[(value) => (value && value.length > 0) || 'Password is required']"
            @click-append-inner="isPasswordVisible.value = !isPasswordVisible.value"
        >
          <template #appendInner>
            <va-icon
                :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'"
                size="small"
                color="primary"
            />
          </template>
        </va-input>
      </va-value>
    </div>
    <div><va-button style="width: 250px;margin: 15px" @click="loginCheck">Log in</va-button></div>
  </va-form>
  <va-modal
      v-model="successDialog"
      message="Login successfully"
      ok-text="Confirm"
      @ok="loginRoute"
      size="small"
  />
  <va-modal
      v-model="failDialog"
      :message="accountStore.msg"
      ok-text="Confirm"
      size="small"
  />
</template>
<script setup>
import {useAccountStore} from "@/store/account.js";
import {nextTick, ref, watch} from "vue";
import {useRouter} from "vue-router";

const accountStore = useAccountStore()
const props = defineProps(['form'])
const loginForm = ref(null)
const router = useRouter()
const successDialog = ref(false)
const failDialog = ref(false)
async function loginCheck() {
  if (loginForm.value.validate()) {
    await accountStore.loginCheck()
    if (accountStore.accountValid) {
      successDialog.value = true
    }
    else failDialog.value = true
  }
}

// watch(() => accountStore.accountValid, () => {
//   if (accountStore.accountValid) {
//     successDialog.value = true
//   }
//   else failDialog.value = true
// })

function loginRoute () {
  if (accountStore.accountRole === 'teacher')
    router.push('/teacher')
  else if (accountStore.accountRole === 'student')
    router.push('/student')
}
</script>


<style scoped>
.login-form{
  margin: 20px;
  text-align: center;
}
</style>
