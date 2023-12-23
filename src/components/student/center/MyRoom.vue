<template>
  <div class="container">
    <VaStepper
        next-disabled
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
  <div v-if="teamStore.roomSelected" class="show-room" >
    <div class="images">
      <va-carousel v-model="imagePage" :items="items" :ratio="16 / 9" />
    </div>
    <div class="room-info" >
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
      ok-text="Confirm"
      size="small"
  />
</template>

<script setup>
import {onMounted, ref, toRef} from 'vue'
import Room1Image from "@/assets/Room1.jpg";
import Room2Image from "@/assets/Room2.png";
import {useAccountStore} from "@/store/account.js";
import {useTeamStore} from "@/store/team.js";
import {useRoomStore} from "@/store/room.js";
import {useRouter} from "vue-router";

const accountStore = useAccountStore()
const teamStore = useTeamStore()
const roomStore = useRoomStore()
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
  { label: '在广场中选择一个队伍加入' },
  { label: '在广场浏览、收藏房间' },
  { label: '在收藏的房间中抢房间' }
]

onMounted(async () => {
  // 设置定时器，每秒检查一次是否需要切换到下一个步骤
  setInterval(() => {
    const currentTime = new Date();
    const targetTime = new Date('2023-12-28T10:00:00');

    if (currentTime >= targetTime) {
      if (step.value !== 2)
        step.value = 2; // 切换到下一个步骤
    }
  }, 1000);
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  if(step.value === 0 && teamStore.joined)
    step.value = 1
});
const viewRoomInfo = (room) => {
  roomStore.roomToView.roomId = room.roomId
  roomStore.roomToView.district = room.district
  roomStore.roomToView.building = room.building
  roomStore.roomToView.roomNumber = room.roomNumber
  roomStore.roomToView.roomType = room.roomType
  roomStore.roomToView.floor = room.floor
  roomStore.roomToView.gender = room.gender
  roomStore.roomToView.description = room.description
  roomStore.roomToView.selectedTeamCreatorId = room.selectedTeamCreatorId
  router.push('/student/square/dormitory/roomInfo')
};
async function cancelSelectRoom (room)
{
  await teamStore.unselectRoom(room.roomId, teamStore.current_team.teamId)
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
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
  width: 1000px;
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
