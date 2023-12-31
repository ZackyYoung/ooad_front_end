<template>
  <va-form class="login-form" ref="formRef"  @keyup.enter="loginCheck">
    <div v-if="retrievePassStage === 0">
      <div>
        <va-icon name="account_circle"></va-icon>
        <va-input
            style="margin: 5px; text-align: left;"
            v-model="loginForm.campusId"
            label="校园号"
            placeholder="请输入校园号"
            :rules="[(value) => (value && value.length > 0) || '未填写校园号']"
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
              v-model="loginForm.password"
              :type="isPasswordVisible.value ? 'text' : 'password'"
              label="密码"
              placeholder="请输入密码"
              :rules="[(value) => (value && value.length > 0) || '未填写密码']"
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
      <div><va-button style="width: 250px;margin: 15px" color="#228B22" gradient @click="loginCheck">登录</va-button></div>
      <div><va-button style="width: 250px;margin: 15px" color="warning" gradient @click="stageContinue">找回密码</va-button></div>
    </div>



    <div v-if="retrievePassStage === 1">
      <div>
        <va-icon name="account_circle"></va-icon>
        <va-input
            style="margin: 5px; text-align: left;"
            v-model="campusId"
            label="校园号"
        />
      </div>
      <div>
        <va-icon name="badge"></va-icon>
        <va-select
            style="margin: 5px;text-align: left"
            v-model="role"
            :rules="[(v) => (v && v.length > 0) || '未选择身份']"
            class="mb-6"
            label="身份"
            :options="role_options"
        />
      </div>

      <va-button style="width: 250px;margin: 10px" color="#228B22" gradient @click="stageContinue">继续</va-button>
      <va-button style="width: 250px;margin: 10px" color="danger" gradient @click="stageBack">返回</va-button>
    </div>
    <div v-if="retrievePassStage === 2">
      <div>
        <div>
          <va-icon name="mail"></va-icon>
          <va-input
              style="margin: 5px; text-align: left;"
              disabled
              v-model="accountMail"
              label="邮箱"
          />
        </div>
        <div>
          <va-icon name="security"/>
          <va-input
              style="margin: 5px; text-align: left;"
              v-model="checkCode"
              label="邮箱验证码"
          />
        </div>
        <va-button
            gradient
            style="width: 250px;margin: 10px"
            color="warning"
            @click="sendCheckCode"
            :disabled="countDown > 0"
        >
          {{countDown > 0 ? countDown + '秒后重新发送': '发送验证码'}}
        </va-button>

      </div>
      <va-button style="width: 250px;margin: 10px" color="#228B22" gradient @click="verifyCheckCode">继续</va-button>
      <va-button style="width: 250px;margin: 10px" color="danger" gradient @click="stageBack">返回</va-button>
    </div>
    <div v-if="retrievePassStage === 3">
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
              :rules="[v => validatePassword(v)]"
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
              v-model=editPasswordForm.newPasswdConfirm
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
      <va-button style="width: 250px;margin: 10px" color="#228B22" gradient @click="updatePassword">确认</va-button>
      <va-button style="width: 250px;margin: 10px" color="danger" gradient @click="stageBack">返回</va-button>
    </div>
  </va-form>
  <va-modal
      v-model="successDialog"
      :message="accountStore.msg"
      ok-text="确认"
      cancel-text="取消"
      @ok="loginRoute"
      size="small"
  />
  <va-modal
      v-model="failDialog"
      :message="accountStore.msg"
      ok-text="确认"
      cancel-text="取消"
      size="small"
  />
</template>
<script setup>
import {useAccountStore} from "@/store/account.js";
import {computed, nextTick, reactive, readonly, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";
import {useForm} from "vuestic-ui";

const {reset, validate} = useForm('formRef')
const accountStore = useAccountStore()
const notificationStore = useNotificationStore()
const messageStore = useMessageStore()
const role_options = readonly(["teacher", "student"])
const campusId = ref('')
const role = ref('student')
const checkCode = ref(null)
const router = useRouter()
const successDialog = ref(false)
const failDialog = ref(false)
const retrievePassStage = ref(0)
const countDown = ref(0)
const loginForm = reactive({
  campusId: "",
  password: ""
})
const editPasswordForm = reactive({
  newPasswd: "",
  newPasswdConfirm: ""
})

const validatePassword = (value) => {
  const re = /^(?=.*[0-9])(?=.*[a-z]).*$/;
  if (!value) {
    return '未输入密码';
  }
  if (!re.test(value)) {
    return '密码必须包含数字和字母'
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


const accountMail = computed(() => {
  let suffix
  if(role.value === 'student')
    suffix = '@mail.sustech.edu.cn'
  else
    suffix = '@sustech.edu.cn'
  suffix = campusId.value + suffix
  return suffix
})

async function sendCheckCode() {
  await accountStore.sendCheckCode(accountMail.value)
  countDown.value = 60;
  const countDownInterval = setInterval(() => {
    countDown.value--;
    if (countDown.value <= 0) {
      clearInterval(countDownInterval);
    }
  }, 1000);
}


async function updatePassword() {
  if (validate()) {
    accountStore.accountCampusId = campusId.value
    await accountStore.directEditPassword(editPasswordForm)
    successDialog.value = true
    reset()
    retrievePassStage.value = 0
  }
}


function stageContinue() {
  retrievePassStage.value = retrievePassStage.value + 1
}
function stageBack() {
  retrievePassStage.value = retrievePassStage.value - 1
}

async function verifyCheckCode()
{
  await accountStore.verifyCheckCode(accountMail.value, checkCode.value)
  if(accountStore.checkCodeCorrect)
  {
    accountStore.checkCodeCorrect = false
    stageContinue()
  }
  else{
    accountStore.msg = '验证码错误'
    failDialog.value = true
  }
}


async function loginCheck() {
  if (validate()) {
    await accountStore.loginCheck(loginForm)
    if (accountStore.accountValid) {
      successDialog.value = true
    }
    else failDialog.value = true
  }
}


function loginRoute () {
  reset()
  if (accountStore.accountRole === 'teacher')
  {
    router.push('/teacher')
    notificationStore.notificationWebsocketInit(accountStore.accountCampusId)
    messageStore.messageWebsocketInit(accountStore.accountCampusId)
  }
  else if (accountStore.accountRole === 'student')
  {
    router.push('/student')
    notificationStore.notificationWebsocketInit(accountStore.accountCampusId)
    messageStore.messageWebsocketInit(accountStore.accountCampusId)
  }
}
</script>


<style scoped>
.login-form{
  margin: 20px;
  text-align: center;
}
</style>
