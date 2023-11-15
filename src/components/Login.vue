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
</template>
<script>
  import {mapState} from "vuex";
  import account from "../store/model/account.js";

  export default {
    name: "login",
    props: ['form'],
    data(){
      return {
      }
    },
    methods: {
      loginCheck(){
        if(this.$refs.loginForm.validate()) {
          this.$store.dispatch("account/loginCheck")
          if (!this.isWrongPassword) {
            if (this.form.role === 'teacher')
              this.$router.push('/teacher')
            else if (this.form.role === 'student')
              this.$router.push('/student')
          }
        }
      }
    },
    computed: {
      ...mapState("account", {
        isWrongPassword: state => !state.accountValid,
        accountRole: state => state.accountRole
      })
    },
    watch: {
      isWrongPassword() {
        if (!this.isWrongPassword) {
          if(this.accountRole === "student")
            this.$router.push('/student')
          else this.$router.push('/teacher')
        }
      }
    }
  }
</script>


<style scoped>
.login-form{
  margin: 20px;
  text-align: center;
}
</style>
