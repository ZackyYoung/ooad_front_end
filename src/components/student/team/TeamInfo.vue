<template>
  <div class="team-manager-container" v-if="teamStore.joined">
    <va-card class="page-content-card team-manager-card">
      <va-card-title style="font-size: 1rem">
        队名：{{ teamStore.current_team.teamName }}
      </va-card-title>
      <div class="team-info">
        <va-data-table
            :items="teamStore.current_team.teamMembers"
            :columns="columns"
        >
          <template #cell(teamRole)="{ rowData }">
            <div v-if="teamStore.current_team.creatorId === rowData.studentId">
              <va-chip>
                队长
              </va-chip>
            </div>
            <div v-else>
              <va-chip outline>
                队员
              </va-chip>
            </div>
          </template>

          <template #cell(option)="{ row }">
            <va-button
                round
                class="mr-2 mb-2"
                color="primary"
                @click="updateAndShowInfo(row.rowData)"
            >
              <va-icon
                  name="visibility"
              />
            </va-button>
          </template>
        </va-data-table>

        <va-modal
            v-model="showDetail"
            hide-default-actions
        >
          <StudentInfo
              :student-info="infoForm"
          />
          <template #footer v-if="isCreator && infoForm.studentId !== accountStore.accountCampusId">
            <va-button
                round
                class="mr-2 mb-2"
                color="secondary"
                @click="transferAndSubmit(infoForm.studentId, infoForm.name)"
            >
              转让队长
            </va-button>
            <va-button
                round
                class="mr-2 mb-2"
                color="danger"
                @click="removeAndSubmit(infoForm.studentId, infoForm.name)"
            >
              移除成员
            </va-button>
          </template>
        </va-modal>
      </div>

      <div class="exit flex">
        <div class="exit-delete">
          <div class="delete-team" v-if="isCreator">
            <va-button
                class="mr-2 mb-2"
                color="danger"
                @click="deleteTeamAndSubmit"
            >
              解散队伍
            </va-button>
          </div>
          <div class="exit-team" v-else>
            <va-button
                class="mr-2 mb-2"
                color="danger"
                @click="exitTeamAndSubmit"
            >
              退出队伍
            </va-button>
          </div>
        </div>
      </div>
    </va-card>
  </div>
  <div v-else>
    <va-card class="no-team">
      <p class="no-team__p">
        你还没有加入队伍，快去广场加入或创建队伍吧~~
      </p>
      <va-button
          class="no-team__button"
          size="large"
          to="/student/square/teamSelect"
      >
        点击前往&nbsp;&nbsp;
        <va-icon
            name="arrow_outward"
        />
      </va-button>
    </va-card>
  </div>
</template>


<script setup>

import StudentInfo from "@/components/student/center/StudentInfo.vue";
import {useTeamStore} from "@/store/team.js";
import {useAccountStore} from "@/store/account";


import {computed, onMounted, reactive, ref} from "vue";
import {useModal, useToast} from 'vuestic-ui'

const accountStore = useAccountStore()
const teamStore = useTeamStore();


onMounted(async () => {
  await accountStore.refreshSession()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
})

const {confirm} = useModal()
const {init} = useToast()

const isCreator = computed(()=>{
  return accountStore.accountCampusId === teamStore.current_team.creatorId
})

const columns = [
  {key: "teamRole", label: "职位"},
  {key: "name", label: "姓名"},
  {key: "studentId", label: "学号"},
  {key: "option", label: "选项"}
];

const showDetail = ref(false);
const infoForm = reactive({
  studentId: 0,
  name: '',
  major: '',
  degree: '',
  gender: '',
  info: '',
})

function updateAndShowInfo(member) {
  infoForm.studentId = member.studentId;
  infoForm.name = member.name;
  infoForm.major = member.major;
  infoForm.gender = member.gender;
  infoForm.degree = member.degree;
  infoForm.info = member.info;
  showDetail.value = true;
}

async function transferAndSubmit(memberId, memberName) {
  const result = await confirm({
    message: "确认要把队长转让给：" + memberName,
    title: '确认？',
    okText: "转让",
    cancelText: "取消",
  })

  if (result) {
    await teamStore.alterLeader(accountStore.accountCampusId, memberId)
    await teamStore.fetchTeamInformation(accountStore.accountCampusId)
    init("转让队长成功")
  } else {
    init("取消转让队长")
  }
  showDetail.value = false
}

async function removeAndSubmit(memberId, memberName) {
  const result = await confirm({
    message: "这会从队伍中移除：" + memberName,
    title: '确认？',
    okText: "移除",
    cancelText: "取消",
  })

  if (result) {
    await teamStore.removeMember(memberId)
    await teamStore.fetchTeamInformation(accountStore.accountCampusId)
    init("移除队员成功")
  } else {
    init("取消移除成员")
  }
  showDetail.value = false
}

async function deleteTeamAndSubmit() {
  const result = await confirm({
    message: "这会解散队伍",
    title: '确认？',
    okText: "解散",
    cancelText: "取消",
  })

  if (result) {
    await teamStore.deleteTeam(accountStore.accountCampusId)
    await teamStore.fetchTeamInformation(accountStore.accountCampusId)
    init("解散队伍成功")
  } else {
    init("取消解散队伍")
  }
  showDetail.value = false
}

async function exitTeamAndSubmit() {
  const result = await confirm({
    message: "这将退出当前队伍，确认吗",
    title: '确认？',
    okText: "退出队伍",
    cancelText: "取消",
  })

  if (result) {
    await teamStore.removeMember(accountStore.accountCampusId)
    await teamStore.fetchTeamInformation(accountStore.accountCampusId)
    init("退出队伍成功")
  } else {
    init("取消退出队伍")
  }
  showDetail.value = false

}

</script>

<style scoped lang="scss">
.team-manager-container {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  text-align: center;
}

.team-manager-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .team-info {
    overflow: auto;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }

  .modal-crud {
    .va-input {
      display: block;
    }
  }

  .exit {
    display: flex;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }
}

.no-team {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;

  &__p {
    //margin: 1rem;
    font-size: 2rem;
    font-family: Microsoft YaHei, serif;
  }

  &__button {
    margin-top: 2rem;
    margin-bottom: 15rem;
  }
}
</style>
