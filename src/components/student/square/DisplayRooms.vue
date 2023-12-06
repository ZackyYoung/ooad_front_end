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

    <va-button @click="applyFilters" color="info" class="apply-button">查询</va-button>
  </div>

  <div class="image-container">
    <div class="row">
      <div v-for="room in displayedRooms" :key="room.id" class="room-card">
        <va-image :src="room.image" alt="Room Image" class="room-image" @click="() => goToRoomInfo()"></va-image>
        <p class="room-name">{{ room.name }}</p>
        <p class="room-description">{{ room.description }}</p>
      </div>
    </div>
  </div>

  <div class="page_select">
    <va-pagination
        v-model="value"
        :pages="Math.ceil(totalRooms / 20)"
        :visible-pages="4"
        class="justify-center sm:justify-start"
        @change="applyFilters"
    />
  </div>
</template>

<script>
import {ref, computed, onMounted, watch} from 'vue';
import { rooms } from '@/testData/roomData.js'; //用来测试
import axios from 'axios'; //实际使用
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const roomsData = ref(rooms);
    const value = ref(1);
    const filters = ref({
      floor: '',
      building: '',
      district: '',
      roomNumber: '',
    });

    const options = {
      floors: Array.from(new Set(roomsData.value.map((room) => room.floor))),
      buildings: Array.from(new Set(roomsData.value.map((room) => room.building))),
      districts: Array.from(new Set(roomsData.value.map((room) => room.district))),
      roomNumbers: Array.from(new Set(roomsData.value.map((room) => room.roomNumber))),
    };

    const sortedBuildings = computed(() => options.buildings.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0)));
    const sortedFloors = computed(() => options.floors.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0)));
    const sortedDistricts = computed(() => options.districts.slice());
    const sortedRoomNumbers = computed(() =>
        options.roomNumbers.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0))
    );

    const totalRooms = computed(() => roomsData.value.length);

    const displayedRooms = ref([]); // 初始化为空数组

    // 测试使用
    const filterRooms = () => {
      const startIdx = (value.value - 1) * 20;
      const endIdx = startIdx + 20;

      displayedRooms.value = roomsData.value
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
          .slice(startIdx, endIdx);
    };

    // 实际使用下面这段代码获取符合条件的房间
    // const filterRooms = async () => {
    //   try {
    //     const response = await axios.post('/api/getFilteredRooms', {
    //       filters: filters.value,
    //       page: value.value, // 将当前页传递到后端
    //       pageSize: 20, // 假设每页包含 20 个房间
    //     });
    //
    //     roomsData.value = response.data.rooms;
    //     totalRooms.value = response.data.total;
    //   } catch (error) {
    //     console.error('获取符合条件的房间时发生错误：', error);
    //   }
    //
    //   const startIdx = (value.value - 1) * 20;
    //   const endIdx = startIdx + 20;
    //
    //   displayedRooms.value = roomsData.value.slice(startIdx, endIdx);
    // };

    const applyFilters = () => {
      filterRooms();
    };

    onMounted(() => {
      applyFilters();
    });

    watch(value, () => {
      filterRooms();
    });

    const goToRoomInfo = () => {

    };

    // 初始化时展示全部房间
    applyFilters();

    return {
      value,
      filters,
      sortedBuildings,
      sortedFloors,
      sortedDistricts,
      sortedRoomNumbers,
      totalRooms,
      displayedRooms,
      applyFilters,
      filterRooms,
      goToRoomInfo,
    };
  },
};
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
