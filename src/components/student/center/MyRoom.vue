<template>
  <va-card class="page-content-card">
    <div class="container">
      <h2 style="font-size: 2rem;font-family: Microsoft YaHei, serif;">
        选择房间时段:{{ periodStore.periodData.startTime + '~' + periodStore.periodData.endTime }}
      </h2>
      <VaStepper
          navigation-disabled
          v-model="step"
          :steps="steps"
          controls-hidden
          class="step"
      />
      <div v-if="step === 0" class="step-info">
        <p>你还没有加入队伍，要加入队伍才能收藏和选择房间，去广场加入队伍吧！</p>
      </div>
      <div v-if="step === 1" class="step-info">
        <p>还未到抢房间的时间，您可以先在广场浏览房间，如果找到合适的房间，别忘了收藏！</p>
      </div>

      <div v-else-if="step === 2" class="step-info">
        <p v-if="!teamStore.roomSelected">现在可以开始抢房间了，快去您收藏的房间中抢房间吧！</p>
        <p v-else>你已经选择了一个宿舍，你可以重新选择宿舍或交换宿舍</p>
      </div>
    </div>
    <div v-if="teamStore.roomSelected" class="show-room">
      <div class="images">
        <va-carousel v-model="imagePage" :items="items" :ratio="16 / 9"/>
      </div>
      <div class="room-info">
        <h2>已选中的房间信息</h2>
        <p>区划：{{ selectedRoom.district }}</p>
        <p>楼栋：{{ selectedRoom.building }}</p>
        <p>楼层：{{ selectedRoom.floor }}</p>
        <p>房间号：{{ selectedRoom.roomNumber }}</p>
        <p>户型：{{ selectedRoom.roomType }}</p>
        <p>简介：{{ selectedRoom.description }}</p>
      </div>
      <div class="center-button">
        <va-button
            style="margin: 10px"
            color="info"
            @click="viewRoomInfo(teamStore.selectedRoom)"
        >
          查看房间信息
        </va-button>
        <va-button
            style="margin: 10px"
            color="danger"
            @click="cancelSelectRoom(teamStore.selectedRoom)"
        >
          取消选择房间
        </va-button>
      </div>
    </div>
    <va-modal
        v-model="dialogVisible"
        :message="teamStore.msg"
        ok-text="确认"
        cancel-text="取消"
        size="small"
    />
  </va-card>
</template>

<script setup>
import {onMounted, ref, toRef} from 'vue'
import Room1Image from "@/assets/Room1.jpg";
import Room2Image from "@/assets/Room2.png";
import {useAccountStore} from "@/store/account.js";
import {useTeamStore} from "@/store/team.js";
import {useRoomStore} from "@/store/room.js";
import {useRouter} from "vue-router";
import {usePeriodStore} from "@/store/period.js";

const accountStore = useAccountStore()
const teamStore = useTeamStore()
const roomStore = useRoomStore()
const periodStore = usePeriodStore()
const router = useRouter()
const step = ref(0)
const imagePage = ref(0);
const dialogVisible = ref(false);
const items = [
  Room1Image,
  Room2Image,
  Room1Image,
  Room2Image,
];

const selectedRoom = toRef(teamStore.selectedRoom)

const steps = [
  {label: '在广场中选择一个队伍加入'},
  {label: '在广场浏览、收藏房间'},
  {label: '在收藏的房间中抢房间'},
  {label: '候补选房和交换房间'}
]

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  await periodStore.getPeriod(accountStore.studentInformationForm.degree, accountStore.studentInformationForm.gender)
  if (teamStore.joined)
    step.value = 1
  const startTime = new Date(periodStore.periodData.startTime)
  const endTime = new Date(periodStore.periodData.endTime)
  const currentTime = new Date();
  if (currentTime >= startTime && currentTime <= endTime) {
    step.value = 2; // 切换到下一个步骤
  }
  if (currentTime > endTime) {
    step.value = 3;
  }
});
const viewRoomInfo = (room) => {
  // roomStore.roomToView.roomId = room.roomId
  // roomStore.roomToView.district = room.district
  // roomStore.roomToView.building = room.building
  // roomStore.roomToView.roomNumber = room.roomNumber
  // roomStore.roomToView.roomType = room.roomType
  // roomStore.roomToView.floor = room.floor
  // roomStore.roomToView.gender = room.gender
  // roomStore.roomToView.description = room.description
  // roomStore.roomToView.selectedTeamCreatorId = room.selectedTeamCreatorId
  roomStore.findRoomToView(room.roomId)
  router.push('/student/square/dormitory/roomInfo')
};

async function cancelSelectRoom(room) {
  await teamStore.unselectRoom(room.roomId, teamStore.current_team.teamId)
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  step.value = 1
  dialogVisible.value = true
}


</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 50px;
}

.step {
  width: 100%;
  margin: 0 auto;
}

.step-info {
  margin-top: 20px;
  font-size: 18px;
}

.show-room {
  margin-left: 50px;
  height: 700px;
  width: 1200px;
}

.images {
  margin-top: 0;
  margin-left: 350px;
  width: 500px;
}

.room-info {
  margin-left: 100px;
  margin-top: 30px;
  height: auto;
}

.center-button {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 100px;
}
</style>
