<template>
  <va-card class="page-content-card">
    <va-card-title style="font-size: 1rem">
      编辑个人信息
    </va-card-title>
    <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
      <va-input
          v-model="form.name"
          :rules="[(v) => validateName(v)]"
          label="Name"
          placeholder="请输入你的姓名"
      />
      <div>
        <span class="va-title">Gender</span>
        <va-option-list
            v-model="form.gender"
            value-by="value"
            :options="gender_options"
            type="radio"
        />
      </div>
      <va-select
          v-model="form.major"
          class="mb-6"
          label="Major"
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
      <va-textarea
          v-model="form.intro"
          label="简介"
          placeholder="请给出你的简介吧"
          autosize
      />
    </va-form>
    <va-button class="save-button" :disabled="!isValid" @click=" submitEdit()">
      提交修改
    </va-button>
  </va-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useForm, useModal} from "vuestic-ui";
import {computed, reactive, readonly} from "vue";
import {gender_options, major_options, year_options} from "@/utils/UserOptions.js";


const {isValid, validate} = useForm('formRef')


const form = reactive({
  sid: 0,
  name: '',
  gender: 1,
  degree: 0,
  major: '',
  intro: '',
})

const showEdit = ref<boolean>(false);

function updateAndShowEditForm(student) {
  form.sid = student.sid;
  form.degree = student.degree;
  form.gender = student.gender;
  form.name = student.name;
  form.major = student.major;
  showEdit.value = true;
}

const validateName = (value: string) => {
  console.log(value.length === 0)
  if (value.length == 0) {
    return 'Field is required'
  }
}

function submitEdit() {
  console.log(form.name);
  console.log('submit!');
  //


  //

  showEdit.value = false;
}


const {confirm} = useModal();

const columns = [
  {key: "sid", label: "学号"},
  {key: "name", label: "姓名"},
  {key: "gender", label: "性别"},
  {key: "degree", label: "学级"},
  {key: "major", label: "专业"},
  {key: "option", label: "操作"}
];
</script>

<style scoped>
.my-form {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 1rem;
  padding: 1.5rem;
}

.save-button {
  margin-left: 0.5rem;
}

</style>