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
              v-model="form.sid"
              value:
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
              label="学级"
              placeholder="选择学级"
              :options="year_options"
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


const info_file = ref([]);

const form = reactive({
  sid: '',
  name: '',
  gender: 0,
  degree: '',
  major: ''
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

const gender_option = readonly([
  {
    text: '男',
    value: 0,
  },
  {
    text: '女',
    value: 1,
  },
])

const major_options = readonly([
  {
    text: "计算机科学与工程系",
    value: "计算机科学与工程系"
  },
  {
    text: "电子系",
    value: "电子系",
  },
  {
    text: "物理系",
    value: "物理系",
  },
  {
    text: "化学系",
    value: "化学系",
  },
  {
    text: "数学系",
    value: "数学系",
  },
  {
    text: "生物系",
    value: "生物系",
  },
  {
    text: "环境系",
    value: "环境系",
  },
  {
    text: "材料系",
    value: "材料系",
  },
]);

const year_options = computed(getYear)

function getYear() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 7; i++) {
    years.push({value: currentYear - i, text: (currentYear - i)});
  }
  return years;
}

function submit() {

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