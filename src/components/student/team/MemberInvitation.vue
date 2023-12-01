<template>
  <div v-if="teamStore.joined">
    <va-card class="page-content-card" >
      <va-data-table
          :items="invitationStore.invitationData"
          :columns="studentColumns"
          no-data-html="无结果"
      >
        <template #cell(is_invitation)="{ rowData }">
          <va-chip
              v-if="rowData.is_invitation"
              color="secondary"
          >
            已邀请
          </va-chip>
          <va-chip
              v-if="!rowData.is_invitation"
              color="primary"
          >
            待通过
          </va-chip>
        </template>

        <template #cell(options)="{ row, rowData }" v-if="isCreator">
          <div v-if="!rowData.is_invitation && isCreator">
            <va-button
                class="mr-2 mb-2"
                color="primary"
                @click="acceptApplication(rowData.studentId)"
            >
              同意
            </va-button>
            <va-button
                class="mr-2 mb-2"
                color="secondary"
                @click="rejectApplication(rowData.studentId)"
            >
              忽略
            </va-button>
          </div>
        </template>
      </va-data-table>
    </va-card>
  </div>
  <div v-else>
    <va-card class="page-content-card" >
      <va-data-table
          :items="invitationStore.invitationData"
          :columns="teamColumns"
          no-data-html="无结果"
      >
        <template #cell(is_invitation)="{ rowData }">
          <va-chip
              v-if="rowData.is_invitation"
              color="secondary"
          >
            待接受
          </va-chip>
          <va-chip
              v-if="!rowData.is_invitation"
              color="primary"
          >
            已申请
          </va-chip>
        </template>

        <template #cell(options)="{ row, rowData }">
          <div v-if="!rowData.is_invitation">
            <va-button
                class="mr-2 mb-2"
                color="primary"
                @click="acceptInvitation(rowData.creatorId, rowData.teamMemberNames)"
            >
              同意
            </va-button>
            <va-button
                class="mr-2 mb-2"
                color="secondary"
                @click="rejectInvitation(rowData.creatorId)"
            >
              忽略
            </va-button>
          </div>
        </template>
      </va-data-table>
    </va-card>
  </div>
</template>

<script setup>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useTeamStore} from "@/store/team.js";

import {storeToRefs} from "pinia";


import {invitation_test1} from "@/test_data/student_test_data.js"
import {useAccountStore} from "@/store/account";
import {useInvitationStore} from "@/store/invitation.js";
import {useToast} from "vuestic-ui";

const teamStore = useTeamStore();
const accountStore = useAccountStore()
const invitationStore = useInvitationStore()
const {init} = useToast()
const isCreator = computed(()=>{
  return accountStore.accountCampusId === teamStore.current_team.creatorId
})

onMounted(async () => {
  await accountStore.refreshSession()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  if(teamStore.joined){
    await invitationStore.getTeamRelatedInvitation(teamStore.current_team.teamId)
  }
  else
  {
    await invitationStore.getStudentRelatedInvitation(accountStore.accountCampusId)
  }
})

const studentColumns = [
  {key: "name", label: "姓名"},
  {key: "studentId", label: "学号"},
  {key: "is_invitation", label: "状态"},
  {key: "options", label: "操作"}
]


async function acceptApplication(studentId) {
  if(teamStore.current_team.teamMembers.length === 3)
  {
    init("队伍已满，无法通过加入申请")
  }
  else
  {
    await teamStore.addMember(accountStore.accountCampusId, studentId)
    await invitationStore.deleteStudentRelatedInvitation(studentId)
  }
  await invitationStore.getTeamRelatedInvitation(teamStore.current_team.teamId)
  init("通过加入申请")
}

async function rejectApplication(studentId) {
  await invitationStore.deleteInvitation(teamStore.current_team.teamId, studentId, false)
  await invitationStore.getTeamRelatedInvitation(teamStore.current_team.teamId)
  init("拒绝加入申请")
}


const teamColumns = [
  {key: 'teamName', label: '队名'},
  {key: 'creatorId', label: '队长学号'},
  {key: 'creatorName', label: '队长名称'},
  {key: 'teamMemberNames', label: '队员'},
  {key: 'is_invitation', label: '状态'},
  {key: 'options', label: '操作'}
]

async function acceptInvitation(creatorId, teamMemberNames){
  if(teamMemberNames.length === 3){
    init("队伍已满，无法加入")
  }
  else{
    await teamStore.addMember(creatorId, accountStore.accountCampusId)
    await invitationStore.deleteStudentRelatedInvitation(accountStore.accountCampusId)
  }
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  await invitationStore.getTeamRelatedInvitation(teamStore.current_team.teamId)
  init("成功加入队伍")
}

async function rejectInvitation(creatorId){
  await invitationStore.deleteInvitation(teamStore.current_team.teamId, studentId, false)
  await invitationStore.getStudentRelatedInvitation(accountStore.accountCampusId)
  init("已拒绝邀请")
}

</script>


<style scoped>

</style>
