<template>
  <div class="team-manager-container">
    <va-card class="team-manager-card">
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
                    @click="selectedMemberIndex=row.initialIndex; showModalConfirmTransfer = true;"
                >
                  转让
                </va-button>
                <va-button
                    round
                    class="mr-2 mb-2"
                    color="danger"
                    @click="selectedMemberIndex=row.initialIndex; showModalConfirmRemove = true;"
                >
                  移除
                </va-button>
                <va-modal
                    class="modal-crud"
                    v-model="showModalConfirmTransfer"
                    close-button
                    :message=transferMessage
                    ok-text="确认转让"
                    title="Confirm Transfer?"
                    @ok="transferAndSubmit"
                />
                <va-modal
                    class="modal-crud"
                    v-model="showModalConfirmRemove"
                    close-button
                    :message=removeMessage
                    ok-text="确认移除"
                    title="Confirm Remove?"
                    @ok="removeAndSubmit"
                />
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

      <div class="invite-exit flex">
        <div class="invite">
          <va-button
              class="mr-2 mb-2"
              color="primary"
              @click="showInvite=true"
          >
            邀请成员
          </va-button>
          <va-button
              class="mr-2 mb-2"
              color="primary"
              @click="showInviteList=true"
          >
            邀请列表
          </va-button>
        </div>

        <div class="exit-delete">
          <div class="delete-team" v-if="is_creator">
            <va-button
                class="mr-2 mb-2"
                color="danger"
                @click="showModalConfirmDeleteTeam=true"
            >
              解散群组
            </va-button>
            <va-modal
                class="modal-crud"
                v-model="showModalConfirmDeleteTeam"
                close-button
                message="这将解散当前群组，确定吗？"
                ok-text="确认解散"
                title="Confirm Delete?"
                @ok="deleteTeamAndSubmit"
            />
          </div>
          <div class="exit-team" v-else>
            <va-button
                class="mr-2 mb-2"
                color="danger"
                @click="showModalConfirmExitTeam=true"
            >
              退出群组
            </va-button>
            <va-modal
                class="modal-crud"
                v-model="showModalConfirmExitTeam"
                close-button
                message="这将退出当前群组，确定吗？"
                ok-text="确认退出"
                title="Confirm Exit?"
                @ok="exitTeamAndSubmit"
            />
          </div>
        </div>
      </div>
      <va-modal
          v-model="showInviteList"
          max-height="600px"
      >
        <div>
          <MemberInvitation
              :invitation-infos=inv1
          />
        </div>
      </va-modal>
    </va-card>
  </div>
</template>


<script setup lang="ts">
import MemberInvitation from "@/components/student/team/MemberInvitation.vue";

import {computed, defineComponent, reactive, ref, toRef} from "vue";
import {InvitationInfoType, TeamInfoType} from "@/utils/types/type";
import {useTeamStore} from "@/store/team.js";
import {storeToRefs} from "pinia";

const teamStore = useTeamStore();
const {creator_id, cur_user_id} = storeToRefs(teamStore);

const teamMembers = reactive(teamStore.teamMembers);
const is_creator = computed(() => teamStore.is_creator);


const columns = [
  {key: "name", label: "姓名"},
  {key: "sid", label: "学号"},
  {key: "feature", label: "功能"}
];

const inv1: InvitationInfoType[] = [
  {
    name: "新人想进1",
    sid: 12112000,
    is_invitation: false,
  },
  {
    name: "邀请了xx",
    sid: 12112001,
    is_invitation: true
  }
]

const selectedMemberIndex = ref(0);

const showInvite = ref(false);
const showInviteList = ref(false);
const showModalConfirmTransfer = ref(false);
const showModalConfirmRemove = ref(false);
const showModalConfirmExitTeam = ref(false);
const showModalConfirmDeleteTeam = ref(false);

const transferMessage = computed(() => {
  return "确认要把队长转让给：" + teamMembers.value[selectedMemberIndex.value].name;
})

function transferAndSubmit() {
  teamStore.transOwner(teamMembers.value[selectedMemberIndex.value].sid);
  selectedMemberIndex.value = 0;


}


const removeMessage = computed(() => {
  return "这会从队伍中移除：" + teamMembers.value[selectedMemberIndex.value].name
})

function removeAndSubmit() {
  teamStore.removeMember(teamMembers.value[selectedMemberIndex.value].sid);
  selectedMemberIndex.value = 0;

}

function deleteTeamAndSubmit() {

}

function exitTeamAndSubmit() {
  teamStore.exitTeam();

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

  .invite-exit {
    display: flex;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }
}

</style>