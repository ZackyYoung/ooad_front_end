<template>
  <va-form class="login-form" ref="formRef">
    <div v-if="regStage === 0" @keyup.enter="continueReg">
      <div>
        <va-icon name="account_circle"></va-icon>
        <va-input
            style="margin: 5px; text-align: left;"
            v-model="registerForm.campusId"
            :rules="[(v) => campusIdValidator(v)]"
            label="校园号"
            placeholder="请输入校园号"
        />
      </div>
      <div>
        <va-icon name="badge"></va-icon>
        <va-select
            style="margin: 5px;text-align: left"
            v-model="registerForm.role"
            :rules="[(v) => (v && v.length > 0) || '未选择身份']"
            class="mb-6"
            label="身份"
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
              v-model="registerForm.password"
              :rules="[(v) => passwordValidator(v)]"
              :type="isPasswordVisible.value ? 'text' : 'password'"
              label="密码"
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
              v-model="registerForm.confirmPassword"
              :rules="[(v) => confirmPasswordValidator(v)]"
              :type="isPasswordVisible.value ? 'text' : 'password'"
              label="确认密码"
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
        <va-button style="width: 250px;margin: 15px" color="#228B22" gradient @click="continueReg">继续</va-button>
      </div>
    </div>



    <div v-if="regStage === 1" @keyup.enter="continueReg">
      <div>
        <va-icon name="account_circle"></va-icon>
        <va-input
            style="margin: 5px; text-align: left;"
            v-model="informationForm.name"
            :rules="[(v) => (v && v.length > 0) || '未输入姓名']"
            label="姓名"
            placeholder="请输入姓名"
        />
      </div>
      <div>
        <va-icon v-if="informationForm.gender === '女'" name="female"/>
        <va-icon v-else name="male"/>
        <va-select
            style="margin: 5px;text-align: left"
            v-model="informationForm.gender"
            :rules="[(v) => (v && v.length > 0) || '未选择性别']"
            class="mb-6"
            label="性别"
            :options="gender_options"
        />
      </div>
      <div>
        <va-icon name="book"></va-icon>
        <va-select
            style="margin: 5px; text-align: left;"
            v-model="informationForm.degree"
            :rules="[(v) => (v && v.length > 0) || '未选择在读学历']"
            class="mb-6"
            label="在读学历"
            placeholder="选择在读学历"
            :options="degree_options"
        />
      </div>
      <div>
        <va-icon name="settings"></va-icon>
        <va-select
            style="margin: 5px; text-align: left;"
            v-model="informationForm.major"
            :rules="[(v) => (v && v.length > 0) || '未选择专业']"
            class="mb-6"
            label="专业"
            placeholder="选择专业"
            :options="major_options"
        />
      </div>
      <div>
        <va-button style="width: 250px;margin: 10px" color="#228B22" gradient @click="continueReg">继续</va-button>
        <va-button style="width: 250px;margin: 10px" color="danger" gradient @click="regStageBack">返回</va-button>
      </div>
    </div>


    <div v-if="regStage === 2" @keyup.enter="registerCheck">
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
      <div>
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

      <div>
        <va-button style="width: 250px;margin: 10px" color="#228B22" gradient @click="registerCheck">注册</va-button>
        <va-button style="width: 250px;margin: 10px" color="danger" gradient @click="regStageBack">返回</va-button>
      </div>

    </div>
  </va-form>
  <va-modal
      v-model="successDialog"
      :message="accountStore.msg"
      ok-text="确认"
      cancel-text="取消"
      @ok="registerRoute"
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
import {computed, reactive, readonly, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {gender_options} from "@/utils/DomOptions.js";
import {degree_options, major_options} from "@/utils/UserOptions.js";
import {useForm} from "vuestic-ui";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";

const accountStore = useAccountStore()
const notificationStore = useNotificationStore()
const messageStore = useMessageStore()
const {reset, validate} = useForm('formRef')
const role_options = readonly(["teacher", "student"])
const router = useRouter()
const successDialog = ref(false)
const failDialog = ref(false)
const regStage = ref(0)
const checkCode = ref('')
const countDown = ref(0)
const registerForm = reactive({
  campusId: "",
  role: "",
  password: "",
  confirmPassword: ""
})

const informationForm = reactive({
  studentId: "",
  name: "",
  gender: "男",
  degree: "",
  major: ""
})

const accountMail = computed(() =>{
  let suffix
  if(registerForm.role === 'student')
    suffix = '@mail.sustech.edu.cn'
  else
    suffix = '@sustech.edu.cn'
  suffix = registerForm.campusId + suffix
  return suffix
})
const campusIdValidator = (value) => {
  const re = /^[0-9]{8}$/;
  if (!value) {
    return '未输入校园号';
  }
  if(!re.test(value)) {
    return '校园号必须是8位数字'
  }
}
const passwordValidator = (value) => {
  const re = /^(?=.*[0-9])(?=.*[a-z]).*$/;
  if (!value) {
    return '未输入密码';
  }
  if (!re.test(value)) {
    return '密码必须包含数字和字母'
  }
}

const confirmPasswordValidator = (value) => {
  if (!value) {
    return '你需要确认你的密码'
  }
  if (value !== registerForm.password) {
    return '密码不一致'
  }
}
function regStageBack()
{
  regStage.value = regStage.value - 1
}
async function continueReg() {
  if (validate()) {
    if(registerForm.role === 'teacher')
      regStage.value = regStage.value + 2
    else
      regStage.value = regStage.value + 1
  }
}

async function sendCheckCode() {
  console.log(accountMail.value)
  await accountStore.sendCheckCode(accountMail.value)
  countDown.value = 60;
  const countDownInterval = setInterval(() => {
    countDown.value--;
    if (countDown.value <= 0) {
      clearInterval(countDownInterval);
    }
  }, 1000);
}

async function registerCheck() {
  await accountStore.verifyCheckCode(accountMail.value, checkCode.value)
  if(accountStore.checkCodeCorrect) {
    accountStore.checkCodeCorrect = false
    await accountStore.registerAccount(registerForm)
    if (accountStore.accountValid) {
      successDialog.value = true
      informationForm.studentId = accountStore.accountCampusId
      await accountStore.updateStudent(informationForm)
    } else {
      failDialog.value = true
    }
  }else{
    accountStore.msg = '验证码错误'
    failDialog.value = true
  }
}

function registerRoute() {
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
.login-form {
  margin: 20px;
  text-align: center;
}
</style>
