<template>
  <va-form class="login-form" ref="registerForm">
    <div>
      <va-icon name="account_circle"></va-icon>
      <va-input
          style="margin: 5px; text-align: left;"
          v-model="form.campusId"
          :rules="[(v) => campusIdValidator(v)]"
          label="CAMPUS ID"
          placeholder="请输入校园号"
      />
    </div>
    <div>
      <va-icon name="badge"></va-icon>
      <va-select
          style="margin: 5px;text-align: left"
          v-model="form.role"
          :rules="[(v) => (v && v.length > 0) || 'Role is required']"
          class="mb-6"
          label="Role"
          :options="role_options"
      />
    </div>
    <va-value
        v-slot="isPasswordVisible"
        :default-value="false"
    >
      <div>
        <va-icon name="key"></va-icon>
        <va-input
            style="margin: 5px; text-align: left"
            v-model="form.password"
            :rules="[(v) => passwordValidator(v)]"
            :type="isPasswordVisible.value ? 'text' : 'password'"
            label="PASSWORD"
            placeholder="请输入密码"
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
      </div>
      <div>
        <va-icon name="shield"></va-icon>
        <va-input
            style="margin: 5px; text-align: left"
            v-model="form.confirmPassword"
            :rules="[(v) => confirmPasswordValidator(v)]"
            :type="isPasswordVisible.value ? 'text' : 'password'"
            label="CONFIRM PASSWORD"
            placeholder="请确认密码"
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
      </div>
    </va-value>
    <div>
      <va-button style="width: 250px;margin: 15px" @click="registerCheck">Register</va-button>
    </div>
  </va-form>
  <va-modal
      v-model="successDialog"
      message="Register successfully"
      ok-text="Confirm"
      @ok="registerRoute"
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
import {readonly, ref, watch} from "vue";
import {useRouter} from "vue-router";

const accountStore = useAccountStore()
const props = defineProps(['form'])
const role_options = readonly(["teacher", "student"])
const registerForm = ref(null)
const router = useRouter()
const successDialog = ref(false)
const failDialog = ref(false)
const campusIdValidator = (value) => {
  const re = /^[0-9]{8}$/;
  if (!value) {
    return 'Campus id is required';
  }
  if(!re.test(value)) {
    return 'Campus id must consist of 8 digits'
  }
}
const passwordValidator = (value) => {
  const re = /^(?=.*[0-9])(?=.*[a-z]).*$/;
  if (!value) {
    return 'Password is required';
  }
  if (!re.test(value)) {
    return 'Password must contain figure and letter'
  }
}

const confirmPasswordValidator = (value) => {
  if (!value) {
    return 'You should confirm your password'
  }
  if (value !== accountStore.registerForm.password) {
    return 'Different with the previous password'
  }
}

async function registerCheck() {
  if(registerForm.value.validate()){
    await accountStore.registerAccount()
    if(accountStore.accountValid){
      successDialog.value = true
    }
    else failDialog.value = true
    }
}

// watch(() => accountStore.accountValid, () => {
//   if(accountStore.accountValid){
//     successDialog.value = true
//   }
//   else failDialog.value = true
// })

function registerRoute () {
  if (accountStore.accountRole === 'teacher')
    router.push('/teacher')
  else if (accountStore.accountRole === 'student')
    router.push('/student')
}
</script>

<style scoped>
.login-form {
  margin: 20px;
  text-align: center;
}
</style>
