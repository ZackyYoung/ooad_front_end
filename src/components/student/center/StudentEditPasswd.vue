<template>
  <div class="edit-container">
    <va-card class="passwd-card">
      <va-card-title style="font-size: 1rem" class="passwd-card__title">修改密码</va-card-title>
      <va-card-content class="passwd-card__content">
        <va-form class="flex flex-col items-baseline gap-6"
                 ref="formRef"
                 :model="form"
        >
          <div>
            <va-value v-slot="isPasswordVisible"
                      :default-value="false"
            >
              <va-icon name="lock"></va-icon>
              <va-input
                  style="margin: 5px; text-align: left"
                  v-model="form.newPasswd"
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
              <va-icon name="lock"></va-icon>
              <va-input
                  style="margin: 5px; text-align: left"
                  v-model=form.newPasswdConfirm
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
            <va-value v-slot="isPasswordVisible"
                      :default-value="false"
            >
              <va-icon name="key"></va-icon>
              <va-input
                  style="margin: 5px; text-align: left"
                  v-model="form.oldPasswd"
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
            <va-button style="width: 250px;margin: 15px" @click="validate() && submit()">确认修改</va-button>
          </div>
        </va-form>
      </va-card-content>
    </va-card>
  </div>
</template>
<script setup lang="ts">
import {computed, reactive, watch} from "vue";
import {useForm} from 'vuestic-ui'

const {isValid, validate, resetValidation} = useForm('formRef')
// const items = computed(() => [
//   {
//     label: '旧密码',
//     placeholder: '请输入旧密码',
//     visible: false,
//     model: form.oldPasswd
//   },
//   {
//     label: '新密码',
//     placeholder: '请输入新密码',
//     visible: false,
//     model: form.newPasswd
//   },
//   {
//     label: '确认新密码',
//     placeholder: '请确认新密码',
//     visible: false,
//     model: form.newPasswdConfirm
//   }
// ]);

const form = reactive({
  oldPasswd: '',
  newPasswd: '',
  newPasswdConfirm: ''
})

const validateOld = (value: string) => {
  if (value === '') {
    return '旧密码不能为空'
  } else {
  }
};

const validateNew = (value: string) => {
  resetValidation()
  if (value === '') {
    return '新密码不能为空'
  } else {
    if (form.newPasswdConfirm !== '') {
    }
  }
};

const validateConfirm = (value: string) => {
  if (value === '') {
    return '请确认密码'
  } else if (value !== form.newPasswd) {
    return '两次密码输入不一致！'
  } else {
  }
};

const rules = reactive({
  oldPasswd: [{validator: validateOld, trigger: 'change'}],
  newPasswd: [{validator: validateNew, trigger: 'change'}],
  newPasswdConfirm: [{validator: validateConfirm, trigger: 'change'}],
});
const submit = () => {
  console.log('submit')
};
// name: "login",
//           props: ['form'],
//           setup(props) {
//         const store = useStore();
//         const router = useRouter();
//
//         const isWrongPassword = computed(() => !store.state.accountValid);
//
//         const loginCheck = () => {
//           store.dispatch("account/loginCheck");
//           if (!isWrongPassword.value) {
//             if (props.form.role === 'Teacher')
//               router.push('/teacher');
//             else if (props.form.role === 'Student')
//               router.push('/student');
//           }
//         };
//
//         watch(isWrongPassword, (newValue) => {
//           if (!newValue) {
//             if (props.form.role === 'Teacher')
//               router.push('/teacher');
//             else if (props.form.role === 'Student')
//         router.push('/student');
//     }
//   });
//
//   return {
//     isWrongPassword,
//     loginCheck
//   };
// }

// const save = async () => {
//
//   await formRef.value.validate()
//   const result = await reqAddOrUpdateUser(userParams)
//   if (result.code == 200) {
//     ElMessage({
//       type: 'success',
//       message: userParams.id ? '更新成功' : '新增成功',
//     })
//     showDrawer.value = false
//   }
// }

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