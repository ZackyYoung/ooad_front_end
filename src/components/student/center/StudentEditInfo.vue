<template>
  <va-card class="page-content-card">
    <va-card-title style="font-size: 1rem">
      编辑个人信息
    </va-card-title>
    <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
      <div>
        <span class="va-title" style="color: #2727cb">用户头像</span>
        <va-file-upload
            v-model="user_picture"
            upload-button-text="上传图片"
            type="gallery"
            file-types="image/png"
        />
      </div>
      <va-input
          v-model="form.name"
          :rules="[(v) => validateName(v)]"
          label="姓名"
          placeholder="请输入你的姓名"
      />
      <div>
        <span class="va-title" style="color: #2727cb">性别</span>
        <va-option-list
            disabled
            v-model="form.gender"
            value-by="value"
            :options="gender_options"
            type="radio"
        />
      </div>
      <va-select
          disabled
          v-model="form.degree"
          class="mb-6"
          label="在读学历"
          placeholder="选择在读学历"
          :options="degree_options"
      />
      <va-select
          v-model="form.major"
          class="mb-6"
          label="专业"
          placeholder="选择专业"
          :options="major_options"
      />
      <va-textarea
          v-model="form.info"
          label="简介"
          placeholder="请给出你的简介吧"
          counter
          :autosize="true"
      />
    </va-form>
    <va-button class="save-button" :disabled="!isValid" @click=" submitEdit()">
      提交修改
    </va-button>
    <va-modal
        v-model="dialogVisible"
        :message="accountStore.msg"
        ok-text="确认"
        cancel-text="取消"
        size="small"
    />
  </va-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useForm, useModal, VaFileUploadSingleItem} from "vuestic-ui";
import {computed, reactive, readonly} from "vue";
import {gender_options, major_options, degree_options} from "@/utils/UserOptions.js";
import {useAccountStore} from "@/store/account.js";
import {usePictureStore} from "@/store/picture.js";


const {isValid, validate} = useForm('formRef')

const accountStore = useAccountStore()
const pictureStore = usePictureStore()

const user_picture = ref([])

onMounted(async () =>{
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  form.studentId = accountStore.accountCampusId
  form.name = accountStore.studentInformationForm.name
  form.gender = accountStore.studentInformationForm.gender
  form.degree = accountStore.studentInformationForm.degree
  form.major = accountStore.studentInformationForm.major
  form.info = accountStore.studentInformationForm.info
})
const form = reactive({
  studentId: accountStore.accountCampusId,
  name: accountStore.studentInformationForm.name,
  gender: accountStore.studentInformationForm.gender,
  degree: accountStore.studentInformationForm.degree,
  major: accountStore.studentInformationForm.major,
  info: accountStore.studentInformationForm.info
})

const showEdit = ref(false);



const validateName = (value) => {
  console.log(value.length === 0)
  if (value.length === 0) {
    return 'Field is required'
  }
}


const dialogVisible = ref(null)
async function submitEdit() {
  form.studentId = accountStore.accountCampusId
  await accountStore.updateStudent(form)
  if(user_picture.value[0])
  {
    const formData = new FormData()
    formData.set("file", user_picture.value[0], `${accountStore.accountCampusId}.png`)
    await pictureStore.updateAvatar(formData)
    await pictureStore.fetchAvatar(accountStore.accountCampusId)
  }
  showEdit.value = false
  dialogVisible.value = true
}


const {confirm} = useModal();

const columns = [
  {key: "studentId", label: "学号"},
  {key: "name", label: "姓名"},
  {key: "gender", label: "性别"},
  {key: "degree", label: "在读学历"},
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
