<template>
  <va-data-table
      :items="invitationInfos"
      :columns="invitationColumns"
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

    <template #cell(options)="{ row, rowData }" v-if="teamStore.is_creator">
      <div v-if="!rowData.is_invitation && teamStore.is_creator">
        <va-button
            class="mr-2 mb-2"
            color="primary"
            @click="acceptInvitation(row.initialIndex)"
        >
          同意
        </va-button>
        <va-button
            class="mr-2 mb-2"
            color="secondary"
            @click="rejectInvitation(row.initialIndex)"
        >
          忽略
        </va-button>
      </div>
    </template>
  </va-data-table>
</template>

<script setup lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import {InvitationInfoType} from "@/utils/types/type";
import {useTeamStore} from "@/store/team.js";
import {storeToRefs} from "pinia";

const teamStore = useTeamStore()

const invitationColumns = [
  {key: "name", label: "姓名"},
  {key: "sid", label: "学号"},
  {key: "is_invitation", label: "状态"},
  {key: "options", label: "操作"}
]

const props = defineProps<{
  invitationInfos: InvitationInfoType[]
}>()
const invitationInfos = reactive(props.invitationInfos)

function acceptInvitation(index: number) {
  console.log("accept: id" + index);

  invitationInfos.splice(index, 1);
}

function rejectInvitation(index: number) {
  console.log("reject: id" + index);

  invitationInfos.splice(index, 1);
}

</script>


<style scoped>

</style>