<template>

  <div class="background-container">
    <div class="mid-container">
      <div class="left-container">
        <va-image class="logo" src="src/assets/LOGO.png"/>
        <h1 class="title">研究生宿舍选择系统</h1>
        <va-form class="login-form">
          <div>
            <va-icon name="account_circle"></va-icon>
            <va-input style="margin: 10px" placeholder="请输入校园号"></va-input>
          </div>
          <div>
            <va-icon name="lock"></va-icon>
            <va-input style="margin: 10px" placeholder="请输入密码"></va-input>
          </div>
          <div><va-button style="width: 250px;margin: 10px">Log in</va-button></div>
          <div><va-button style="width: 250px;margin: 10px">Register</va-button></div>
        </va-form>
      </div>

      <div class="right-container">
        <va-image src="src/assets/dormitory.png"></va-image>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.background-container {
  height: 100%;
  width: 100%;
  position: fixed;
  background: linear-gradient(to right, #dafdfc 50%, #10037c 50%);
}
.mid-container {
  display: flex;
  border-radius: 20px;
  height: 70%;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to right, white 50%, #eafdfd 50%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.left-container {
  flex: 1;
}

.right-container {
  flex: 1;
  text-align: right;
}
.logo {
  width: 360px;
  height: 108px;
  margin: 0 auto;
}
.title{
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
  font-family: 华光准圆_CNKI,serif;
}
.login-form{
  margin: 50px;
  text-align: center;
}
</style>
