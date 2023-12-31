<template>
  <va-card class="my_card">
    <va-card-title>
      选房时间
    </va-card-title>
    <div>
      <va-select
          style="margin: 20px"
          v-model="form.degree"
          class="mb-6"
          label="在读学历"
          placeholder="选择在读学历"
          :options="degree_options"
      />
      <va-select
          style="margin: 20px"
          v-model="form.gender"
          class="mb-6"
          label="性别"
          placeholder="选择性别"
          :options="gender_options"
      />
    </div>
    <va-card-content>
      <p class="my_para">选房起始时间：
        <span> {{ timeData.startTime }}</span>
      </p>
      <p class="my_para">选房结束时间：
        <span> {{ timeData.endTime }}</span>
      </p>
    </va-card-content>
  </va-card>

  <va-card class="my_card">
    <va-card-title>
      编辑时间
    </va-card-title>
    <va-card-content>
      <el-date-picker
          style="margin: 0.5rem"
          v-model="timeForm"
          :disabled-date="disabledDateFn"
          type="datetimerange"
          :value-format="'YYYY-MM-DD HH:mm:ss'"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
      />
      <div>
        <va-button
            :disabled="!(form.gender && form.degree && timeForm[0] && timeForm[1])"
            icon="save"
            @click="submitTime"
            style="margin-left: 1rem;margin-top: 0.5rem"
        >
          保存新时间
        </va-button>
      </div>
    </va-card-content>
  </va-card>
  <va-card class="my_card">
    <va-card-title>
      选房结果
    </va-card-title>
    <va-card-content>
      <va-button
          @click="exportResult"
      >
        <va-icon name="download"/>
        下载选房结果
      </va-button>
    </va-card-content>
  </va-card>
  <va-modal
      v-model="dialogVisible"
      :message="periodStore.msg"
      ok-text="确认"
      cancel-text="取消"
      size="small"
  />
</template>

<script setup>
import {onMounted, reactive, ref, toRef, watch} from "vue";
import {degree_options} from "@/utils/UserOptions";
import {gender_options} from "@/utils/DomOptions";
import {usePeriodStore} from "@/store/period.js";
import * as XLSX from "xlsx";
import {useTeamStore} from "@/store/team.js";


const periodStore = usePeriodStore()
const teamStore = useTeamStore()

const dialogVisible = ref(false)
const selectFinished = ref(false)
const form = reactive({
  degree: '',
  gender: ''
})


watch(form, async (newValue, oldValue) => {
  if(form.degree && form.gender)
    await periodStore.getPeriod(form.degree, form.gender)
})


const timeData = toRef(periodStore.periodData)
const timeForm = ref('')
const disabledDateFn = (time) => {
  return time.getTime() < Date.now() - 8.64e7;
};

async function submitTime() {
  await periodStore.updatePeriod(form.degree, form.gender, timeForm)
  dialogVisible.value = true;
}

async function exportResult() {
  const results = [['teamName', 'creatorId', 'teamMembers', 'district', 'buildingId', 'roomNumber', 'roomType', 'gender']]
  await teamStore.findAllTeam(null, null, true)
  for (const team of teamStore.teamData) {
    await teamStore.getSelectedRoom(team.teamId)
    if(teamStore.roomSelected)
    {
      results.push([
          team.teamName,
          team.creatorId,
          team.teamMembers.toString(),
          teamStore.selectedRoom.district,
          teamStore.selectedRoom.building,
          teamStore.selectedRoom.roomNumber,
          teamStore.selectedRoom.roomType,
          teamStore.selectedRoom.gender
      ])
    }
  }
  // 创建工作簿对象
  const workbook = XLSX.utils.book_new();

// 创建工作表对象
  const worksheet = XLSX.utils.aoa_to_sheet(results);

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// 将工作簿保存为XLSX文件
  XLSX.writeFile(workbook, 'selectionResults.xlsx');


}

</script>

<style scoped>
.my_card {
  margin: 0.2rem;
  padding: 0.5rem;

  .my_para {
    font-size: 1rem;
    margin: 0.3rem;
  }
}

.icon_button {
  margin-left: 0.2rem;
}
</style>
