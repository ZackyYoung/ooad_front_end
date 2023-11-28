<template>
  <div class="page-content-card create-dom-container">
    <va-card class="create-dom-card">
      <div class="input-info">
        <p class="my-title">
          新建宿舍
        </p>

        <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
          <va-select
              v-model="form.zones"
              :options="['湖畔','荔园','二期']"
              :rules="[(v) => Boolean(v)|| '区域不能为空！']"
              label="区域"
              placeholder="请选择宿舍区域"
          />
          <va-input
              v-model="form.building"
              label="楼栋号"
              :rules="[(v) => buildingIdValidator(v)]"
              placeholder="请输入楼栋号（整数数字）"
          />
          <va-input
              v-model="form.floor"
              label="楼层"
              :rules="[(v) => floorValidator(v)]"
              placeholder="请输入楼层（整数数字）"
          />

          <va-select
              v-model="form.room_type"
              class="mb-6"
              label="户型"
              :rules="[(v) => Boolean(v)|| '户型不能为空！']"
              placeholder="选择户型"
              :options="type_options"
              value-by="value"
          />
          <va-select
              v-model="form.gender"
              class="mb-6"
              label="宿舍性别"
              :rules="[(v) => Boolean(v)|| '性别不能为空！']"
              placeholder="选择宿舍性别"
              :options="gender_option"
              value-by="value"
          />
          <va-textarea
              v-model="form.description"
              label="简介"
              placeholder="请给出宿舍简介"
              autosize
          />
        </va-form>
        <div class="form_b">
          <va-button class="save-button" :disabled="!isValid" @click="validate() && submit()">
            提交信息
          </va-button>
        </div>
      </div>
    </va-card>
  </div>
</template>


<script setup lang="ts">

import {computed, defineComponent, reactive, readonly, ref, toRef} from "vue";
import {useForm} from "vuestic-ui";

const {isValid, validate, reset, resetValidation} = useForm('formRef')


const form = reactive({
  zones: '',
  building: '',
  floor: '',
  gender: '',
  room_type: '',
  description: ''
})
const type_options = readonly([
  {text: '单人房', value: 1},
  {text: '双人房', value: 2},
  {text: '四人房', value: 4},
])

const gender_option = readonly([
  {text: '男', value: 1},
  {text: '女', value: 2},
])

const buildingIdValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '楼栋号不能为空！';
  }
  if (!re.test(value)) {
    return '楼栋号必须为整数数字！'
  }
  if (Number(value) > 50) {
    return '楼栋号过大！'
  }
}

const floorValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '楼层不能为空！';
  }
  if (!re.test(value)) {
    return '楼层必须为整数数字！'
  }
  if (Number(value) > 20) {
    return '层数值过大！'
  }
}


function submit() {

}

</script>

<style lang="scss" scoped>
.create-dom-container {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
}

.create-dom-card {
  display: flex;
  justify-content: center;
  //align-items: center;
  flex-direction: column;

  .my-title {
    font-size: 1.5rem;
    text-align: left;
    padding: 1rem;
  }

  .my-form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 1rem;
    padding: 1.5rem;
  }

  .save-button {
    margin: 1.5rem;
  }
}


</style>