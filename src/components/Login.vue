<template>
  <va-form class="login-form">
    <div>
      <va-icon name="account_circle"></va-icon>
      <va-input
          style="margin: 5px; text-align: left;"
          v-model="campus_id"
          label="CAMPUS ID"
          placeholder="请输入校园号"
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
    <div><va-button style="width: 250px;margin: 15px">Log in</va-button></div>
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
    }
  }
</script>


<style scoped>
.login-form{
  margin: 20px;
  text-align: center;
}
</style>
