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
        <p v-else>你的队伍已经选择了一个宿舍，队长可以重新选择宿舍或交换宿舍</p>
      </div>
    </div>
    <div v-if="teamStore.roomSelected" class="show-room">
      <div class="images">
        <va-carousel v-model="imagePage" :items="items" :ratio="16 / 9"/>
      </div>
      <div class="room-info-container">
        <div class="room-info-list">
          <div class="room-info" v-for="displayItem in roomDisplayItems">
            <va-chip
                shadow
                :readonly="true"
                :icon="displayItem.icon"
            >
              {{ displayItem.label }}
            </va-chip>
            <va-chip
                shadow
                outline
                class="ma-2"
            >
            <span v-if="displayItem.label==='楼栋'">
            {{ selectedRoom[displayItem.valueBy] }}栋
            </span>
              <span v-else-if="displayItem.label==='楼层'">
              {{ selectedRoom[displayItem.valueBy] }}层
            </span>
              <span v-else-if="displayItem.label==='户型'">
                <span v-if="selectedRoom[displayItem.valueBy] === 1">
                  单人间
                </span>
                <span v-else-if="selectedRoom[displayItem.valueBy] === 2">
                  双人间
                </span>
                <span v-else-if="selectedRoom[displayItem.valueBy] === 3">
                  三人间
                </span>
                <span v-else>
                  四人间
                </span>
            </span>
              <span v-else-if="displayItem.label==='性别'">
                {{ selectedRoom[displayItem.valueBy] }}生寝室
            </span>
              <span v-else>
            {{ selectedRoom[displayItem.valueBy] }}
          </span>
            </va-chip>
          </div>
        </div>
        <div class="room-info-description-container">
          <va-card
              class="room-info"
              outlined
          >
            <VaCardTitle class="room-info-description">简介</VaCardTitle>
            <VaCardContent>
              <p class="room-info-description">
                {{ selectedRoom.description ? selectedRoom.description : "没有额外介绍了~" }}
              </p>
            </VaCardContent>
          </va-card>
        </div>
      </div>
      <div class="center-button">
        <va-button
            style="margin: 10px"
            color="info"
            @click="viewRoomInfo(teamStore.selectedRoom)"
        >
          查看房间信息
        </va-button>
        <va-button v-if="accountStore.accountCampusId===teamStore.current_team.creatorId"
                   style="margin: 10px"
                   color="danger"
                   @click="onCancelClick(teamStore.selectedRoom)"
        >
          取消选择房间
        </va-button>
      </div>
      <va-modal
          v-model="dialogVisible"
          :message="teamStore.msg"
          ok-text="确认"
          cancel-text="取消"
          size="small"
      />
    </div>
  </va-card>
</template>

<script setup>
import {onMounted, ref, toRef} from 'vue'
import {useModal, useToast} from 'vuestic-ui'

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

const {confirm} = useModal()
const {init} = useToast()

const selectedRoom = toRef(teamStore.selectedRoom)

const roomDisplayItems = [
  {label: '区划', valueBy: 'district', icon: 'grid_on'},
  {label: '楼栋', valueBy: 'building', icon: 'apartment'},
  {label: '楼层', valueBy: 'floor', icon: 'stairs'},
  {label: '房间', valueBy: 'roomNumber', icon: 'living'},
  {label: '户型', valueBy: 'roomType', icon: 'diversity_3'},
  {label: '性别', valueBy: 'gender', icon: 'wc'}
]

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

async function onCancelClick(room) {
  const result = await confirm({
    message: '您确定要取消选房吗',
    title: '取消选择?',
    okText: "确定",
    cancelText: "取消",
  })

  if (result) {
    await cancelSelectRoom(room)
    init('取消选择成功')
  } else {
    init('取消操作')
  }
}

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

.room-info-container {
  display: flex;
  margin-top: 4rem;
}

.room-info-list {
  //flex: 1;
  margin-left: auto;

}

.room-info-description-container {
  margin-left: auto;
  min-width: 30rem;
  text-align: center;
}

.room-info-description {
  font-family: HGY3, serif;
  font-size: 1rem;
}

.center-button {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 100px;
}
</style>
