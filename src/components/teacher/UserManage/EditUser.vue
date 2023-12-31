<template>
  <va-card class="page-content-card">
    <va-card-title>
      搜索学生
    </va-card-title>
    <va-form>
      <div>
        <va-input
            style="margin: 0.5rem"
            v-model="filter"
            placeholder="请输入要搜索的学号或姓名"
        >
          <template #prependInner>
            <va-icon
                name="person"
                color="secondary"
            />
          </template>
        </va-input>
      </div>
    </va-form>
  </va-card>

  <va-card style="padding: 1rem;">
    <va-card-title>
      学生列表
    </va-card-title>

    <va-data-table
        style="padding: 1rem"
        :items="studentStore.studentData"
        :per-page="perPage"
        :current-page="current_page"
        :columns="columns"
        :filter="filter"
        @filtered="filtered_total = $event.items.length"
        no-data-filtered-html="无结果"
        noDataHtml="无结果"
    >
      <template #cell(option)="{ rowData }">
        <va-button
            round
            class="mr-2 mb-2"
            color="primary"
            @click="updateAndShowEditForm(rowData)"
        >
          <va-icon
              name="edit"
          />
        </va-button>
        <va-button
            round
            class="mr-2 mb-2"
            color="danger"
            @click="deleteAndConfirm(rowData.studentId)"
        >
          <va-icon
              name="delete"
          />
        </va-button>
      </template>
      <template #cell(gender)="{ rowData }">
        {{ rowData.gender}}
      </template>
    </va-data-table>
    <VaPagination
        v-model="current_page"
        class="mb-3 justify-center sm:justify-start"
        :pages="Math.ceil(filtered_total / perPage)"
        input
        buttons-preset="default"
    />

    <va-modal
        v-model="showEdit"
        hide-default-actions
        cancel-text="取消"
    >
      <h3 class="va-h3">
        编辑：StudentId: {{ form.studentId }}
      </h3>
      <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
        <va-input
            v-model="form.name"
            :rules="[(v) => validateName(v)]"
            label="姓名"
            placeholder="请输入学生姓名"
        />
        <div>
          <span class="va-title">性别</span>
          <va-option-list
              v-model="form.gender"
              value-by="value"
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
      <template #footer>
        <va-button class="save-button" :disabled="form.name.length===0" @click=" submitEdit(form)">
          提交修改
        </va-button>
      </template>
    </va-modal>
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
import {onBeforeMount, onBeforeUpdate, onMounted, ref} from "vue";
import {useForm, useModal} from "vuestic-ui";
import {computed, reactive, readonly} from "vue";
import {major_options, degree_options} from "@/utils/UserOptions";
import {useStudentStore} from "@/store/student.js";
import {useAccountStore} from "@/store/account.js";

const studentStore = useStudentStore()
const accountStore = useAccountStore()

const {isValid, validate} = useForm('formRef')


const current_page = ref(1);
const perPage = ref(5);

const form = reactive({
  studentId: 0,
  name: 'name',
  gender: 1,
  degree: 0,
  major: ''
})

const showEdit = ref(false);

function updateAndShowEditForm(student) {
  form.studentId = student.studentId;
  form.degree = student.degree;
  form.gender = student.gender;
  form.name = student.name;
  form.major = student.major;
  showEdit.value = true;
}

const validateName = (value) => {

  if (value.length === 0) {
    return 'Field is required'
  }
}

const dialogVisible = ref(false)
async function submitEdit(form) {
  await accountStore.updateStudent(form)
  showEdit.value = false
  dialogVisible.value = true
  await studentStore.findAllStudent(null, null, true)
}

const gender_option = readonly(['男', '女'])


onMounted(async () => {
  await studentStore.findAllStudent(null, null, true)
})

const filter = ref("")
const filtered_total = ref(studentStore.studentData.length)

const {confirm} = useModal();

async function deleteAndConfirm(delete_id) {
  const result = await confirm({
    message: `你确认删除用户 ID: ${delete_id} 吗`,
    title: '确认删除？',
    okText: "确认",
    cancelText: "取消",
  })

  if (result) {
    await accountStore.deleteUser(delete_id)
    dialogVisible.value = true
    await studentStore.findAllStudent(null, null, true)
  }
}

const columns = [
  {key: "studentId", label: "学号", sortable: true},
  {key: "name", label: "姓名", sortable: true},
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

</style>
