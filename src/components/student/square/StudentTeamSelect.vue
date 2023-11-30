<template>
  <va-card class="page-content-card">
    <va-card-title>
      搜索队伍
    </va-card-title>
    <va-form>
      <div>
        <va-input
            style="margin: 0.5rem"
            v-model="filter"
            placeholder="请输入队伍名称或队长学号"
        >
          <template #prependInner>
            <va-icon
                name="flag"
                color="secondary"
            />
          </template>
        </va-input>


      </div>
    </va-form>
  </va-card>

  <va-card class="page-content-card">
    <va-card-title>
      队伍列表
    </va-card-title>

    <va-data-table
        style="padding: 1rem"
        :items="teamStore.teamData"
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
            @click="updateAndShowInfo(rowData)"
        >
          <va-icon
              name="visibility"
          />
        </va-button>
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
    <TeamInfoSimple
        :team-info="infoForm"
    />
    <template #footer>
      <va-button @click=" submitApplication()">
        申请入队
      </va-button>
    </template>
  </va-modal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useForm, useModal} from "vuestic-ui";
import {computed, reactive, readonly} from "vue";
import {useAccountStore} from "@/store/account";
import {useStudentStore} from "@/store/student.js";
import {useTeamStore} from "@/store/team.js";
import TeamInfoSimple from "@/components/student/team/TeamInfoSimple.vue";

const {isValid, validate} = useForm('formRef')


const accountStore = useAccountStore()
const teamStore = useTeamStore()
const studentStore = useStudentStore()

const perPage = ref(5);
const show_detail = ref(false);
const current_page = ref(1)

onMounted(() => {
  teamStore.findAllTeam()
})

const infoForm = reactive({
  teamName: '',
  creatorId: '',
  creatorName: '',
  teamMembers: []
})


function updateAndShowInfo(team) {
  infoForm.teamName = team.teamName
  infoForm.creatorId = team.creatorId
  infoForm.creatorName = team.creatorName
  infoForm.teamMembers = team.teamMembers
  show_detail.value = true;
}




function submitApplication() {
  console.log(infoForm.studentId);
  console.log('submit!');
  show_detail.value = false;
}



const filter = ref("")

const filtered_total = ref(studentStore.studentData.length)


const columns = [
  {key: "teamName", label: "队名", sortable: true},
  {key: "creatorId", label: "队长学号", sortable: true},
  {key: "creatorName", label: "队长姓名", sortable: true},
  {key: "teamMembers", label: "队员"},
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
