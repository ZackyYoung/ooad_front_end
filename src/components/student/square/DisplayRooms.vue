<template>
  <div v-if="showMap">
    <div class="display-map">
      <va-image
          fit="contain"
          :src="Map"
          class="map-image"
          :ratio="4/3"
          @click="handleMapClick"
      />
    </div>
  </div>
  <div v-else>
    <div class="display-rooms">
      <va-card class="page-content-card">
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
              placeholder="选择楼栋(请先选择区划)"
              class="select"
              clearable
              clearable-icon="cancel"
              :disabled="!filters.district"
          />

          <label>楼层：</label>
          <va-select
              v-model="filters.floor"
              :options="sortedFloors"
              placeholder="选择楼层(请先选择楼栋)"
              class="select"
              clearable
              clearable-icon="cancel"
              :disabled="!filters.building"
          />

          <label>房间号：</label>
          <va-select
              v-model="filters.roomNumber"
              :options="sortedRoomNumbers"
              placeholder="选择房间号(请先选择楼层)"
              class="select"
              clearable
              clearable-icon="cancel"
              :disabled="!filters.floor"
          />
        </div>

        <va-button color="info" gradient class="back-button" @click="returnToMap">
          <va-icon name="logout"></va-icon>
          返回地图
        </va-button>

        <div class="image-container" style="text-align: center;">
          <div class="row">
            <div v-for="room in displayedRooms" :key="room.id" class="room-card">
              <va-image :src="Room1Image" alt="Room Image" class="room-image"></va-image>
              <div style="text-align: center;display: flex;justify-content: space-between;margin: 10px">
                <va-chip outline shadow>{{ room.building }}栋</va-chip>
                <va-chip shadow>{{ room.roomNumber }}</va-chip>
                <va-chip shadow color="#7f1f90">
                  <div v-if="room.roomType === 1">
                    单人间
                  </div>
                  <div v-else-if="room.roomType === 2">
                    双人间
                  </div>
                  <div v-else-if="room.roomType === 3">
                    三人间
                  </div>
                  <div v-else>
                    四人间
                  </div>
                </va-chip>
              </div>
              <div style="text-align: center;display: grid;grid-gap: 10px">
                <va-button round gradient @click="viewDetail(room)">
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
      </va-card>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useRoomStore} from "@/store/room.js";
import Room1Image from "@/assets/Room1.jpg";
import Map from "@/assets/SUST-map.png";
import {useAccountStore} from "@/store/account.js";

const showMap = ref(true);
const router = useRouter();
const roomStore = useRoomStore();
const accountStore = useAccountStore()
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

const sortedDistricts = computed(() => options.districts.slice());

const sortedBuildings = computed(() => {
  const selectedDistrict = filters.value.district;
  return options.buildings
      .filter((building) => selectedDistrict === '' || roomStore.roomData.some((room) => room.building === building && room.district === selectedDistrict))
      .slice()
      .sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
});

const sortedFloors = computed(() => {
  const selectedBuilding = filters.value.building;
  return options.floors
      .filter((floor) => selectedBuilding === '' || roomStore.roomData.some((room) => room.floor === floor && room.building === selectedBuilding))
      .slice()
      .sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
});

const sortedRoomNumbers = computed(() => {
  const selectedFloor = filters.value.floor;
  return options.roomNumbers
      .filter((roomNumber) => selectedFloor === '' || roomStore.roomData.some((room) => room.roomNumber === roomNumber && room.floor === selectedFloor))
      .slice()
      .sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
});

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
      }).sort((a, b) => {
        if (a.building === b.building)
          return a.roomNumber - b.roomNumber
        else return a.building - b.building
      }).slice(startIdx, endIdx)
})


const handleMapClick = (event) => {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  updateDistrictValue(x, y);
};

const updateDistrictValue = (x, y) => {

  if (x > 550 && y > 200 &&x < 700 && y < 290) {
    filters.value.district = '湖畔';
    showMap.value = false;
  } else if ((x > 585 && y > 120 &&x < 705 && y < 190) || (x > 705 && y > 165 &&x < 805 && y < 240) || (x > 805 && y > 185 &&x < 835 && y < 240)) {
    filters.value.district = '二期';
    showMap.value = false;
  } else if ((x > 760 && y > 90 &&x < 860 && y < 140) || (x > 800 && y > 120 &&x < 900 && y < 170)) {
    filters.value.district = '荔园';
    showMap.value = false;
  } else if ((x > 1000 && y > 10 &&x < 1100 && y < 100)) {
    filters.value.district = '欣园';
    showMap.value = false;
  }
};

const returnToMap = () => {
  showMap.value = true;
};

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await roomStore.findAllRoomByGender(accountStore.studentInformationForm.gender)
});

const viewDetail = (room) => {
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
}

watch(
    () => showMap.value,
    (newShowMap) => {
      if (newShowMap) {
        // 当地图显示时清空筛选条件的值
        filters.value.floor = '';
        filters.value.building = '';
        filters.value.district = '';
        filters.value.roomNumber = '';
      }
    }
);

watch(
    () => filters.value.district,
    (newDistrict) => {
      options.buildings = Array.from(new Set(roomStore.roomData
          .filter((room) => newDistrict === '' || room.district === newDistrict)
          .map((room) => room.building)
      ));

      filters.value.building = '';
      filters.value.floor = '';
      filters.value.roomNumber = '';

      sortedBuildings.value = options.buildings.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
      sortedFloors.value = options.floors.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
      sortedRoomNumbers.value = options.roomNumbers.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
    }
);

watch(
    () => filters.value.building,
    (newBuilding) => {
      options.floors = Array.from(new Set(roomStore.roomData
          .filter((room) => {
            return (
                (filters.value.district === '' || room.district === filters.value.district) &&
                (newBuilding === '' || room.building === newBuilding));
          })
          .map((room) => room.floor)
      ));

      filters.value.floor = '';
      filters.value.roomNumber = '';

      sortedFloors.value = options.floors.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
      sortedRoomNumbers.value = options.roomNumbers.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
    }
);

watch(
    () => filters.value.floor,
    (newFloor) => {
      options.roomNumbers = Array.from(new Set(roomStore.roomData
          .filter((room) => {
            return (
                (filters.value.district === '' || room.district === filters.value.district) &&
                (filters.value.building === '' || room.building === filters.value.building) &&
                (newFloor === '' || room.floor === newFloor));
          })
          .map((room) => room.roomNumber)
      ));

      filters.value.roomNumber = '';

      sortedRoomNumbers.value = options.roomNumbers.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0));
    }
);

</script>

<style scoped>
.map-image {
  margin-top: 30px;
  max-width: 100%;
  height: 700px;
  display: block;
}

.filter-container {
  margin-top: 50px;
  margin-left: 20px;
  margin-bottom: 10px;
  align-items: center;
}

.back-button {
  margin-left: 1100px;
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
  bottom: 0;
  right: 0;
  left: 150px;
  background-color: transparent;
  padding: 10px;
}
</style>
