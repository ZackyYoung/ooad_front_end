<template>
  <div class="create-user-container">
    <va-card class="page-content-card create-user-card">
      <div class="upload-file">
        <p class="my-title">
          通过文件批量导入
        </p>
        <va-file-upload
            v-model="info_file"
            style="margin:1rem;"
            dropzone
            file-types="xlsx"
            dropZoneText="上传学生信息文件（.xlsx）"
        />
        <div style="text-align: center">
          <va-button @click="file_import(info_file[0])">
            确认提交
          </va-button>
        </div>
      </div>
      <div class="input-info">
        <p class="my-title">
          填写学生信息导入
        </p>

        <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
          <va-input
              v-model="form.studentId"
              :rules="[(v) => campusIdValidator(v)]"
              label="学号"
              placeholder="请输入学生学号"
          />
          <va-input
              v-model="form.name"
              label="姓名"
              placeholder="请输入学生姓名"
          />
          <div>
            <span class="va-title">性别</span>
            <va-option-list
              v-model="form.gender"
              :options="gender_option"
              type="radio"
            />
          </div>
          <va-select
            v-model="form.major"
            class="mb-6"
            label="专业"
            placeholder="选择专业"
            :options="major_options"
          />
          <va-select
            v-model="form.degree"
            class="mb-6"
            label="在读学历"
            placeholder="选择在读学历"
            :options="degree_options"
          />
        </va-form>
        <div class="form_b">
          <va-button class="save-button" :disabled="!isValid" @click="validate() && createStudent(form)">
            提交信息
          </va-button>
        </div>
      </div>
      <va-modal
          v-model="dialogVisible"
          :message="accountStore.msg"
          ok-text="Confirm"
          size="small"
      />
    </va-card>
  </div>
</template>


<script setup>

import {computed, defineComponent, reactive, readonly, ref, toRef} from "vue";
import {useForm} from "vuestic-ui";
import {useAccountStore} from "@/store/account.js";
import * as XLSX from 'xlsx';
import {major_options, degree_options,} from "@/utils/UserOptions.js";
const {isValid, validate, reset, resetValidation} = useForm('formRef')
const accountStore = useAccountStore()

const form = reactive({
  studentId: "",
  name: null,
  gender: null,
  degree: null,
  major: null,
  info: null
})

const campusIdValidator = (value) => {
  const re = /^[0-9]{8}$/;
  if (!value) {
    return 'Campus id is required';
  }
  if (!re.test(value)) {
    return 'Campus id must consist of 8 digits'
  }
}

const gender_option = readonly(["男", "女"])


const dialogVisible = ref(false)
async function createStudent(form) {
  await accountStore.createStudent(form)
  dialogVisible.value = true
}
const info_file = ref([])
async function file_import(file)
{
  const fileReader = new FileReader();

  fileReader.onload = async (event) => {
    const arrayBuffer = event.target.result;

    // 将 Array Buffer 转换为工作簿对象
    const workbook = XLSX.read(arrayBuffer, {type: 'array'});

    // 获取第一个工作表
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // 将工作表转换为 JSON 数据
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

    const headers = jsonData[0];

    // 构建带属性的 JSON
    const result = jsonData.slice(1).map((row) => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || null
      })
      return obj
    });
    for (const item of result) {
      await createStudent(item)
    }

  };

  fileReader.readAsArrayBuffer(file);
}
</script>

<style lang="scss" scoped>
.create-user-container {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
}

.create-user-card {
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
