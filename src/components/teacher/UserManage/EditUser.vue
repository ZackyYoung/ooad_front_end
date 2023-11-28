<template>
  <va-card class="page-content-card">
    <va-card-title>
      搜索学生
    </va-card-title>
    <va-form>
      <div>
        <va-input
            style="margin: 0.5rem"
            v-model="search_key"
            placeholder="请输入要搜索的学生学号"
        >
          <template #prependInner>
            <va-icon
                name="person"
                color="secondary"
            />
          </template>
        </va-input>

        <va-button
            style="margin: 0.5rem"
            :disabled="!search_key"
            @click="search"
        >
          搜索
          <va-icon
              name="search"
          />
        </va-button>
        <va-button
            style="margin: 0.5rem"
            :disabled="!search_key"
            @click="resetSearch"
        >
          清除
          <va-icon
              name="restart_alt"
          />
        </va-button>
      </div>
    </va-form>
  </va-card>

  <va-card style="padding: 1rem;">
    <va-card-title>
      学生列表
    </va-card-title>

    <va-data-table
        style="padding: 1rem"
        :items="user_data"
        :columns="columns"
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
            @click="deleteAndConfirm(rowData.sid)"
        >
          <va-icon
              name="delete"
          />
        </va-button>
      </template>
      <template #cell(gender)="{ rowData }">
        {{ rowData.gender === 2 ? '女' : '男' }}
      </template>
    </va-data-table>
    <va-pagination
        v-model="need_serial_number"
        :page-size="pageSize"
        :total="total"
        :visible-pages="4"
        class="justify-center sm:justify-start"
        @update:model-value="getUserByNeedNumber"
    />
    <va-modal
        v-model="showEdit"
        hide-default-actions
    >
      <h3 class="va-h3">
        编辑：Sid: {{ form.sid }}
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
            label="学级"
            placeholder="选择学级"
            :options="degree_options"
        />
      </va-form>
      <template #footer>
        <va-button class="save-button" :disabled="form.name.length===0" @click=" submitEdit()">
          提交修改
        </va-button>
      </template>
    </va-modal>
  </va-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useForm, useModal} from "vuestic-ui";
import {computed, reactive, readonly} from "vue";
import {major_options, degree_options} from "@/utils/UserOptions";

const {isValid, validate} = useForm('formRef')

let search_key = ref<string>('');
const perPage = ref(2);
const need_serial_number = ref<number>(1);
const pageSize = ref<number>(2);


const form = reactive({
  sid: 0,
  name: 'name',
  gender: 1,
  degree: 0,
  major: ''
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

const gender_option = readonly([
  {text: '男', value: 1},
  {text: '女', value: 2},
])


const user_data = [
  {
    sid: 12110000,
    name: '苏苏',
    gender: 2,
    degree: 2021,
    major: '计算机科学与工程系',
    intro: '大家好'
  },
  {
    sid: 12110001,
    name: '南小科',
    gender: 1,
    degree: 2022,
    major: '电子系',
    intro: '大家坏'
  },
  {
    sid: 12110002,
    name: '玉群',
    gender: 1,
    degree: 2020,
    major: '软件工程',
    intro: '不想写ooad'
  },
  {
    sid: 12110003,
    name: '坤坤',
    gender: 1,
    degree: 2022,
    major: '物理系',
    intro: '开学了啊啊啊啊啊啊啊啊'
  }
];

const total = ref<number>(user_data.length);

const {confirm} = useModal();

async function getUserByNeedNumber(pager = 1) {
  need_serial_number.value = pager;
  console.log('cur_need_id:' + need_serial_number.value)

}

async function deleteAndConfirm(delete_id: number) {
  const result = await confirm({
    message: `你确认删除用户 ID: ${delete_id} 吗`,
    title: '确认删除？',
    okText: "确认",
    cancelText: "取消",
  })

  if (result) {
    console.log('delete id:' + delete_id)
  } else {
  }
}

// function pages() {
//   return perPage && perPage.value !== 0
//       ? Math.ceil(user_data.length / perPage.value)
//       : user_data.length;
// }

const columns = [
  {key: "sid", label: "学号"},
  {key: "name", label: "姓名"},
  {key: "gender", label: "性别"},
  {key: "degree", label: "学级"},
  {key: "major", label: "专业"},
  {key: "option", label: "操作"}
];


function search() {
  console.log('Search by key: ' + search_key.value)
  getUserByNeedNumber(1)
}

function resetSearch() {
  search_key.value = ''
  console.log('Search by key: ' + search_key.value)
  getUserByNeedNumber(1)
}
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