<template>
  <div class="create-user-container">
    <va-card class="create-user-card">
      <div class="upload-file">
        <p class="my-title">
          通过文件批量导入
        </p>
        <va-file-upload
            v-model="info_file"
            style="margin:1rem;"
            dropzone
            file-types="csv"
            dropZoneText="上传学生信息文件（.csv）"
        />
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
          <va-button class="save-button" :disabled="!isValid" @click="validate() && submit()">
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

const {isValid, validate, reset, resetValidation} = useForm('formRef')
const accountStore = useAccountStore()
const info_file = ref([])

const form = accountStore.studentInformationForm

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

const major_options = readonly([
    "计算机科学与工程系",
    "电子系",
    "物理系",
    "化学系",
    "数学系",
    "生物系",
    "环境系",
    "材料系"
]);

const degree_options = readonly(["硕士生", "博士生"])
// const year_options = computed(getYear)
//
// function getYear() {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = 0; i < 7; i++) {
//     years.push({value: currentYear - i, text: (currentYear - i)});
//   }
//   return years;
// }

const dialogVisible = ref(false)
async function submit() {
  await accountStore.createStudent(accountStore.studentInformationForm.studentId)
  dialogVisible.value = true
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
