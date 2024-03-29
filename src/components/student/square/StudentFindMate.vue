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

  <va-card class="page-content-card">
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
      <template #cell(avatar)="{ rowData }">
        <va-avatar
            :src="rowData.avatar"
            fallback-src="src/assets/avatar1.png"
        />
      </template>
      <template #cell(option)="{ rowData }" >
        <div v-if="rowData.studentId !== accountStore.accountCampusId">
          <va-button
              round
              class="mr-2 mb-2"
              color="primary"
              @click="updateAndShowInfo(rowData)"
          >
            <va-icon name="visibility"/>
            查看信息
          </va-button>
          <va-button
              round
              color="warning"
              @click="startChat(rowData)"
          >
            <va-icon name="chat"/>
            发起聊天
          </va-button>
        </div>
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

  </va-card>
  <va-modal
      v-model="show_detail"
      hide-default-actions
  >
    <StudentInfo
        :student-info="infoForm"
    />
    <template #footer>
      <va-button @click=" submitInvite()">
        邀请此人
      </va-button>
    </template>
  </va-modal>
  <va-modal
      v-model="dialogVisible"
      :message="teamStore.msg"
      ok-text="确认"
      cancel-text="取消"
      size="small"
  />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useForm, useModal, useToast} from "vuestic-ui";
import {computed, reactive, readonly} from "vue";
import StudentInfo from "@/components/student/center/StudentInfo.vue";
import {useAccountStore} from "@/store/account";
import {useStudentStore} from "@/store/student.js";
import {useTeamStore} from "@/store/team.js";
import {useMessageStore} from "@/store/message.js";
import {useRoute, useRouter} from "vue-router";
import {usePictureStore} from "@/store/picture.js";

const {isValid, validate} = useForm('formRef')

const props=defineProps(['search_id'])

const accountStore = useAccountStore()
const studentStore = useStudentStore()
const messageStore = useMessageStore()
const teamStore = useTeamStore()
const pictureStore = usePictureStore()
const route=useRoute()
const router = useRouter()
const perPage = ref(5);
const show_detail = ref(false);
const current_page = ref(1)

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await studentStore.findAllStudent(accountStore.studentInformationForm.gender, accountStore.studentInformationForm.degree, false)
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
})

const infoForm = reactive({
  studentId: 0,
  name: 'name',
  gender: 1,
  degree: 0,
  major: '',
  info: '',
  avatar: null
})


async function startChat(student){
  if(!(messageStore.chatData.some(item => item.slaveId === student.studentId))) {
    messageStore.chatData.push({
      slaveId: student.studentId,
      slaveName: student.name,
      slaveAvatar: student.avatar,
      masterId: accountStore.accountCampusId,
      masterAvatar: pictureStore.userAvatar,
      messages: []
    })
  }
  await router.push('/student/notification/chat')
}

function updateAndShowInfo(student) {
  infoForm.studentId = student.studentId;
  infoForm.degree = student.degree;
  infoForm.gender = student.gender;
  infoForm.name = student.name;
  infoForm.major = student.major;
  infoForm.info = student.info;
  infoForm.avatar = student.avatar;
  show_detail.value = true;
}
const {init} = useToast()
const dialogVisible = ref(false)
async function submitInvite() {
  show_detail.value = false;
  if (teamStore.current_team.teamMembers.length === 4) {
    init("你的队伍人数已满")
  } else if(teamStore.roomSelected)
  {
    init("请先取消选择房间，再进行队伍操作")
  }
  else
  {
    await teamStore.inviteToJoinTeam(teamStore.current_team.creatorId, infoForm.studentId)
    dialogVisible.value = true
  }
}


const filter = ref('')
filter.value=route.query.search_id

const filtered_total = ref(studentStore.studentData.length)


const columns = [
  {key: "studentId", label: "学号", sortable: true},
  {key: "name", label: "姓名", sortable: true},
  {key: "avatar", label: "头像"},
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
