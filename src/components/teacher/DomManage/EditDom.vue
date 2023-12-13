<template>
  <div class="filter-container">
    <label>区划：</label>
    <va-select
        v-model="filters.district"
        :options="sortedDistricts"
        placeholder="选择区划"
        class="select"
        clearable
        clearable-icon="cancel"
    />

    <label>楼栋：</label>
    <va-select
        v-model="filters.building"
        :options="sortedBuildings"
        placeholder="选择楼栋"
        class="select"
        clearable
        clearable-icon="cancel"
    />

    <label>楼层：</label>
    <va-select
        v-model="filters.floor"
        :options="sortedFloors"
        placeholder="选择楼层"
        class="select"
        clearable
        clearable-icon="cancel"
    />

    <label>房间号：</label>
    <va-select
        v-model="filters.roomNumber"
        :options="sortedRoomNumbers"
        placeholder="选择房间号"
        class="select"
        clearable
        clearable-icon="cancel"
    />

  </div>

  <div class="image-container" style="text-align: center;">
    <div class="row">
      <div v-for="room in displayedRooms" :key="room.id" class="room-card">
        <va-image :src="Room1Image" alt="Room Image" class="room-image"></va-image>
        <div style="text-align: center;display: flex;justify-content: space-between;margin: 10px">
          <va-chip outline shadow>{{room.building}}栋</va-chip>
          <va-chip shadow>{{room.roomNumber}}</va-chip>
          <va-chip shadow color="#7f1f90">
            <div v-if="room.roomType === 3">
              三人间
            </div>
            <div v-else-if="room.roomType === 4">
              四人间
            </div>
            <div v-else>
              五人间
            </div>
          </va-chip>
        </div>
        <div style="text-align: center;display: grid;grid-gap: 10px">
          <va-button round gradient>
            <va-icon name="edit"/>
            编辑
          </va-button>
          <va-button round gradient>
            <va-icon name="info"/>
            查看详情
          </va-button>
        </div>
      </div>
    </div>
  </div>

  <div class="page_select">
    <va-pagination
        v-model="current_page"
        :pages="Math.ceil(totalRooms / perPage)"
        class="mb-3 justify-center sm:justify-start"
        input
    />
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import { rooms } from '@/testData/roomData.js'; //用来测试
import { useRouter } from 'vue-router';
import {useRoomStore} from "@/store/room.js";
import Room1Image from "@/assets/Room1.jpg";
const router = useRouter();
const roomsData = ref(rooms);
const roomStore = useRoomStore();
const perPage = ref(8);
const current_page = ref(1);
const filters = ref({
  floor: '',
  building: '',
  district: '',
  roomNumber: '',
});

const options = {
  floors: Array.from(new Set(roomStore.roomData.map((room) => room.floor))),
  buildings: Array.from(new Set(roomStore.roomData.map((room) => room.building))),
  districts: Array.from(new Set(roomStore.roomData.map((room) => room.district))),
  roomNumbers: Array.from(new Set(roomStore.roomData.map((room) => room.roomNumber))),
};

const sortedBuildings = computed(() => options.buildings.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0)));
const sortedFloors = computed(() => options.floors.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0)));
const sortedDistricts = computed(() => options.districts.slice());
const sortedRoomNumbers = computed(() =>
    options.roomNumbers.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0))
);

const totalRooms = computed(() => roomStore.roomData.length)

const displayedRooms = computed(() => {
  const startIdx = (current_page.value - 1) * perPage.value;
  const endIdx = startIdx + perPage.value;
  return roomStore.roomData
      .filter((room) => {
        if (filters.value.floor && room.floor !== filters.value.floor) {
          return false;
        }
        if (filters.value.building && room.building !== filters.value.building) {
          return false;
        }
        if (filters.value.district && room.district !== filters.value.district) {
          return false;
        }
        if (filters.value.roomNumber && room.roomNumber !== filters.value.roomNumber) {
          return false;
        }

        return true;
      })
      .slice(startIdx, endIdx)
})

onMounted(async () => {
  await roomStore.findAllRoom()
});

const goToRoomInfo = () => {

};

// 初始化时展示全部房间

</script>

<style scoped>
.filter-container {
  margin-top: 50px;
  margin-left: 20px;
  margin-bottom: 50px;
  align-items: center;
}

.filter-container label {
  margin-top: 5px;
  font-size: 15px;
  margin-left: 8px;
}

.apply-button {
  margin-left: 5px;
  padding: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 10px;
}

.select {
  max-height: 200px;
  width: 200px;
  overflow-y: auto;
  color: black;
  background-color: white;
  border-color: #ccc;
  border-width: 1px;

}

.image-container {
  margin-top: 50px;
  margin-left: 120px;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
}

.room-card {
  text-align: center;
  width: 20%;
  margin: 0 1%;

}

.room-image {
  width: 100%;
  height: auto;
  margin: 20px;
  max-height: 200px;
}

.room-description {
  margin-top: 10px;
}

.page_select {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 150px;
  background-color: transparent;
  padding: 10px;
}
</style>
