<template>
  <va-form class="login-form" ref="registerForm">
    <div>
      <va-icon name="account_circle"></va-icon>
      <va-input
          style="margin: 5px; text-align: left;"
          v-model="form.campus_id"
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
          :rules="[(v) => v || 'Role is required']"
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
            v-model="form.comfirmPassword"
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
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "register",
  props: ['form'],
  data() {
    const options = [
      {
        text: "Teacher",
        value: "teacher"
      },
      {
        text: "Student",
        value: "student"
      }
    ]
    const campusIdValidator = (value) => {
      const re = /^[0-9]{8}$/;
      if (!value) {
        return 'Campus id is required';
      }
      if (!re.test(value)) {
        return 'Campus id must be consists of 8 digits';
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
      if (value !== this.form.password) {
        return 'Different with the previous password'
      }
    }
    return {
      role_options: options,
      campusIdValidator,
      passwordValidator,
      confirmPasswordValidator
    }
  },
  methods: {
    registerCheck() {
      this.$store.dispatch("account/registerAccount");
      if(this.accountValid) {
        if (this.form.role === 'Teacher')
          this.$router.push('/teacher')
        else if (this.form.role === 'Student')
          this.$router.push('/student')
      }
    }
  },
  computed: {
    ...mapState("purchase", {
      accountValid: state => state.accountValid,
      errorMsg: state => state.errorMsg
    })
  },
  watch: {
    accountValid() {
      if (this.accountValid) {
        if(this.form.role === 'Teacher')
          this.$router.push('/teacher')
        else if(this.form.role === 'Student')
          this.$router.push('/student')
      }
    },
  }
}
</script>

<style scoped>
.login-form {
  margin: 20px;
  text-align: center;
}
</style>
