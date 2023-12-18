<template>
  <div class="container">
    <VaStepper
        v-model="step"
        :steps="steps"
        controls-hidden
        class="step"
    />

    <div v-if="step === 0" class="step-info">
      <p>还未到抢房间的时间，您可以先在广场浏览房间，如果找到合适的房间，别忘了收藏！</p>
    </div>

    <div v-else-if="step === 1" class="step-info">
      <p>现在可以开始抢房间了，快去您收藏的房间中抢房间吧！</p>
    </div>
  </div>
  <div v-if="step===1" class="show-room" >
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
      <va-button color="info" @click="viewRoomInfo()" class="check-info-button">查看房间信息</va-button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import Room1Image from "@/assets/Room1.jpg";
import Room2Image from "@/assets/Room2.png";

const step = ref(0)
const imagePage = ref(0);
const items = [
  Room1Image,
  Room2Image,
  Room1Image,
  Room2Image,
];

const selectedRoom = ref({
  district: '湖畔',
  building: '5栋',
  floor: '5层',
  roomNumber: '520',
  roomType: '四人间',
  description: '添加简介',
})

const steps = [
  { label: '在广场浏览、收藏房间 2023-12-18--2023-12-28' },
  { label: '在收藏的房间中抢房间 2023-12-28 10:00AM' },
]

const viewRoomInfo = () => {

};
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
