<template>
  <va-form class="login-form" ref="loginForm">
    <div>
      <va-icon name="account_circle"></va-icon>
      <va-input
          style="margin: 5px; text-align: left;"
          v-model="campus_id"
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
            v-model="password"
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
  export default {
    name: "login",
    data(){
      return {
        campus_id: "",
        password: ""
      }
    },
    methods: {
      loginCheck(){
        if(this.$refs.loginForm.validate())
          this.$router.push('/teacher');
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
