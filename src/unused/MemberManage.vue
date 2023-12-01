<template>
  <div class="team-manager-container">
    <va-card class="page-content-card team-manager-card">
      <div class="team-info">
        <va-data-table
            :items="teamMembers.value"
            :columns="columns"
        >
          <template #cell(feature)="{ row }">
            <div v-if="is_creator">
              <div v-if="creator_id!==row.rowData.sid">
                <va-button
                    round
                    class="mr-2 mb-2"
                    color="secondary"
                    @click="transferAndSubmit(row.initialIndex)"
                >
                  转让
                </va-button>
                <va-button
                    round
                    class="mr-2 mb-2"
                    color="danger"
                    @click="removeAndSubmit(row.initialIndex)"
                >
                  移除
                </va-button>
              </div>
              <div v-else>
                <va-chip
                    class="mr-3 mb-2"
                    color="primary"
                >
                  队长
                </va-chip>
              </div>
            </div>

            <div v-else>
              <va-chip
                  class="mr-3 mb-2"
                  color="primary"
                  v-if="row.rowData.sid===creator_id"
              >
                队长
              </va-chip>
              <va-chip
                  class="mr-3 mb-2"
                  color="secondary"
                  v-if="row.rowData.sid!==creator_id"
              >
                成员
              </va-chip>
            </div>
          </template>
        </va-data-table>
      </div>

      <div class="exit flex">
        <div class="exit-delete">
          <div class="delete-team" v-if="is_creator">
            <va-button
                class="mr-2 mb-2"
                color="danger"
                @click="deleteTeamAndSubmit"
            >
              解散群组
            </va-button>
          </div>
          <div class="exit-team" v-else>
            <va-button
                class="mr-2 mb-2"
                color="danger"
                @click="exitTeamAndSubmit"
            >
              退出群组
            </va-button>
          </div>
        </div>
      </div>
    </va-card>
  </div>
</template>


<script setup lang="ts">

import {computed,  reactive,} from "vue";
import {useTeamStore} from "@/store/team.js";
import {storeToRefs} from "pinia";

const teamStore = useTeamStore();
const {creator_id, cur_user_id} = storeToRefs(teamStore);

const teamMembers = reactive(teamStore.teamMembers);
const is_creator = computed(() => teamStore.is_creator);
import {useModal, useToast} from 'vuestic-ui'

const {confirm} = useModal()
const {init} = useToast()


const columns = [
  {key: "name", label: "姓名"},
  {key: "sid", label: "学号"},
  {key: "feature", label: "功能"}
];

async function transferAndSubmit(memberIndex) {
  const result = await confirm({
    message: "确认要把队长转让给：" + teamMembers.value[memberIndex].name,
    title: '确认？',
    okText: "转让",
    cancelText: "取消",
  })

  if (result) {
    teamStore.transOwner(teamMembers.value[memberIndex].sid);
  } else {
    init("取消转让队长")
  }

}

async function removeAndSubmit(memberIndex) {
  const result = await confirm({
    message: "这会从队伍中移除：" + teamMembers.value[memberIndex].name,
    title: '确认？',
    okText: "移除",
    cancelText: "取消",
  })

  if (result) {
    await teamStore.removeMember(teamMembers.value[memberIndex].sid);
    init("移除成员成功")
  } else {
    init("取消移除成员")
  }

}

async function deleteTeamAndSubmit() {
  const result = await confirm({
    message: "这会解散群组",
    title: '确认？',
    okText: "解散",
    cancelText: "取消",
  })

  if (result) {
    //

    //
  } else {
    init("取消")
  }
}

async function exitTeamAndSubmit() {
  const result = await confirm({
    message: "这将退出当前群组，确认吗",
    title: '确认？',
    okText: "退出群组",
    cancelText: "取消",
  })

  if (result) {
    teamStore.exitTeam();
  } else {
    init("取消退出群组")
  }


}


</script>

<style lang="scss" scoped>
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

</style>
