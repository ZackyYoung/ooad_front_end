<template>
  <div class="edit-container">
    <va-card class="page-content-card passwd-card">
      <va-card-title style="font-size: 1rem" class="passwd-card__title">修改密码</va-card-title>
      <va-card-content class="passwd-card__content">
        <va-form class="flex flex-col items-baseline gap-6"
                 ref="formRef"
        >
          <div>
            <va-value v-slot="isPasswordVisible"
                      :default-value="false"
            >
              <va-icon name="key"></va-icon>
              <va-input
                  style="margin: 5px; text-align: left"
                  v-model="editPasswordForm.oldPasswd"
                  :type="isPasswordVisible.value ? 'text' : 'password'"
                  label='旧密码'
                  placeholder='请输入旧密码'
                  :rules="[v => validateOld(v)]"
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
          <div>
            <va-value v-slot="isPasswordVisible"
                      :default-value="false"
            >
              <va-icon name="lock"></va-icon>
              <va-input
                  style="margin: 5px; text-align: left"
                  v-model="editPasswordForm.newPasswd"
                  :type="isPasswordVisible.value ? 'text' : 'password'"
                  label='新密码'
                  placeholder='请输入新密码'
                  :rules="[v => validateNew(v)]"
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
          <div>
            <va-value v-slot="isPasswordVisible"
                      :default-value="false"
            >
              <va-icon name="shield"></va-icon>
              <va-input
                  style="margin: 5px; text-align: left"
                  v-model="editPasswordForm.newPasswdConfirm"
                  :type="isPasswordVisible.value ? 'text' : 'password'"
                  label='确认新密码'
                  placeholder='请确认新密码'
                  :rules="[v => validateConfirm(v)]"
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

          <div>
            <va-button style="width: 250px;margin: 15px" @click="editPassword()">确认</va-button>
          </div>
        </va-form>
      </va-card-content>
    </va-card>
    <va-modal
        v-model="edited"
        :message="accountStore.msg"
        ok-text="确认"
        cancel-text="取消"
        size="small"
    />
  </div>
</template>
<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useForm} from 'vuestic-ui'
import {useAccountStore} from "@/store/account.js";
import {storeToRefs} from "pinia";

const {reset, validate} = useForm('formRef')
const accountStore = useAccountStore()
const edited = ref(false)
const editPasswordForm = reactive({
  oldPasswd: "",
  newPasswd: "",
  newPasswdConfirm: ""
})
const validateOld = (value) => {
  const re = /^(?=.*[0-9])(?=.*[a-z]).*$/;
  if (!value) {
    return '未输入旧密码';
  }
}

const validateNew = (value) => {
  const re = /^(?=.*[0-9])(?=.*[a-z]).*$/;
  if (!value) {
    return '未输入新密码';
  }
  if (!re.test(value)) {
    return '密码必须包含数字和字母'
  }
  if (value === editPasswordForm.oldPasswd) {
    return '密码不一致'
  }
}

const validateConfirm = (value) => {
  if (!value) {
    return 'You should confirm your password'
  }
  if (value !== editPasswordForm.newPasswd) {
    return 'Different with the previous password'
  }
}


async function editPassword () {

  if(validate())
  {
    await accountStore.editPassword(editPasswordForm)
    edited.value = true
    reset()
  }
}

</script>

<style scoped>
.edit-container {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;

  text-align: center;

  .passwd-card {
    &__title {
      font-size: 1rem;
    }

    &__content {
      padding-left: 3rem;
      padding-right: 3rem;
      display: grid;
      grid-gap: 1rem;
    }
  }
}
</style>
