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
      <va-icon name="badge"></va-icon>
      <va-select
          style="margin: 5px;text-align: left"
          v-model="role"
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
      </div>
      <div>
        <va-icon name="shield"></va-icon>
        <va-input
            style="margin: 5px; text-align: left"
            v-model="password_confirmation"
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
    <div><va-button style="width: 250px;margin: 15px">Register</va-button></div>
  </va-form>
</template>

<script>
  export default {
    name: "registration",
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
      ];
      return {
        campus_id: "",
        password: "",
        password_confirmation: "",
        role: "",
        role_options: options
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
