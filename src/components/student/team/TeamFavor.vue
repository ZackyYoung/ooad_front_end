<template>
  <div v-if="teamStore.joined && teamStore.hasFavoriteRoom">
    <h2 style="font-size: 2rem;font-family: Microsoft YaHei, serif; text-align: center">
      选择房间时段:{{periodStore.periodData.startTime + '~' + periodStore.periodData.endTime}}
    </h2>
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
        <div v-for="(room, index) in displayedRooms" :key="index" class="room-card">
          <va-image :src="Room1Image" alt="Room Image" class="room-image"></va-image>
          <div style="text-align: center;display: flex;justify-content: space-between;margin: 10px">
            <va-chip outline shadow>{{room.building}}栋</va-chip>
            <va-chip shadow>{{room.roomNumber}}</va-chip>
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

            <va-button
                v-if="!teamStore.roomSelected && isCreator"
                :disabled="!isInSelectTime || room.selectedTeamCreatorId !== '' "
                round
                gradient
                color="#228B22"
                @click="selectRoom(room)"
            >
              <va-icon name="check"/>
              {{room.selectedTeamCreatorId === '' ? '选择宿舍': '已被其他队伍选择'}}
            </va-button>
            <va-button
              v-if="(teamStore.selectedRoom.roomId === room.roomId) && isCreator"
              :disabled="!isInSelectTime"
              round
              gradient
              color="#danger"
              @click="cancelSelectRoom(room)"
            >
              <va-icon name="cancel"/>
              取消选择
            </va-button>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-else-if="teamStore.joined">
    <va-card class="no-team">
      <p class="no-team__p">
        你的队伍还没有收藏房间，快去广场看看吧~~
      </p>
      <va-button
          class="no-team__button"
          size="large"
          to="/student/square/dormitory"
      >
        点击前往&nbsp;&nbsp;
        <va-icon
            name="arrow_outward"
        />
      </va-button>
    </va-card>
  </div>
  <div v-else>
    <va-card class="no-team">
      <p class="no-team__p">
        你还没有加入队伍，快去广场加入或创建队伍吧~~
      </p>
      <va-button
          class="no-team__button"
          size="large"
          to="/student/square/teamSelect"
      >
        点击前往&nbsp;&nbsp;
        <va-icon
            name="arrow_outward"
        />
      </va-button>
    </va-card>
  </div>
  <va-modal
      v-model="dialogVisible"
      :message="teamStore.msg"
      ok-text="确认"
      cancel-text="取消"
      size="small"
  />
</template>


<script setup>

import StudentInfo from "@/components/student/center/StudentInfo.vue";
import {useTeamStore} from "@/store/team.js";
import {useAccountStore} from "@/store/account";


import {computed, onMounted, reactive, ref} from "vue";
import {useModal, useToast} from 'vuestic-ui'
import Room1Image from "@/assets/Room1.jpg";
import {useRoomStore} from "@/store/room.js";
import {useRouter} from "vue-router";
import {usePeriodStore} from "@/store/period.js";

const accountStore = useAccountStore()
const teamStore = useTeamStore();
const roomStore = useRoomStore();
const periodStore = usePeriodStore()


const dialogVisible = ref(false);
const perPage = ref(8);
const current_page = ref(1);
const isInSelectTime = ref(false);
const {init} = useToast()
const router = useRouter()

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
 // await teamStore.getSelectedRoom(teamStore.current_team.teamId)
  await periodStore.getPeriod(accountStore.studentInformationForm.degree, accountStore.studentInformationForm.gender)
  const initTime = new Date();
  const startTime = new Date(periodStore.periodData.startTime);
  const endTime = new Date(periodStore.periodData.endTime);
  if (initTime >= startTime && initTime <= endTime) {
    isInSelectTime.value = true
  }
  setInterval(() => {
    const currentTime = new Date();
    if (currentTime >= startTime && currentTime <= endTime) {
        isInSelectTime.value = true
    }
  }, 1000);
})

const isCreator = computed(() =>{
  return accountStore.accountCampusId === teamStore.current_team.creatorId
})






const filters = ref({
  floor: '',
  building: '',
  district: '',
  roomNumber: '',
});

const options = {
  floors: Array.from(new Set(teamStore.current_team.favoriteRooms.map((room) => room.floor))),
  buildings: Array.from(new Set(teamStore.current_team.favoriteRooms.map((room) => room.building))),
  districts: Array.from(new Set(teamStore.current_team.favoriteRooms.map((room) => room.district))),
  roomNumbers: Array.from(new Set(teamStore.current_team.favoriteRooms.map((room) => room.roomNumber))),
};



const sortedBuildings = computed(() => options.buildings.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0)));
const sortedFloors = computed(() => options.floors.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0)));
const sortedDistricts = computed(() => options.districts.slice());
const sortedRoomNumbers = computed(() =>
    options.roomNumbers.slice().sort((a, b) => (a !== '' && b !== '' ? a - b : 0))
);

const totalRooms = computed(() => teamStore.current_team.favoriteRooms.length)



const displayedRooms = computed(() => {
  const startIdx = (current_page.value - 1) * perPage.value;
  const endIdx = startIdx + perPage.value;
  return teamStore.current_team.favoriteRooms
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
      }).sort((a, b) =>{
        if(a.building === b.building)
          return a.roomNumber - b.roomNumber
        else return a.building - b.building
      }).slice(startIdx, endIdx)
})


function viewDetail (room)
{
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
}

async function selectRoom (room)
{
  if(teamStore.current_team.teamMembers.length !== room.roomType)
  {
    init('你的队伍人数不能选择这个房间')
  }
  else
  {
    await teamStore.selectRoom(room.roomId, teamStore.current_team.teamId)
    await teamStore.fetchTeamInformation(accountStore.accountCampusId)
    dialogVisible.value = true
  }
}

async function cancelSelectRoom (room)
{
  await teamStore.unselectRoom(room.roomId, teamStore.current_team.teamId)
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  dialogVisible.value = true
}

</script>

<style scoped lang="scss">
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
.team-manager-container {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  text-align: center;
}

.team-manager-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .team-info {
    overflow: auto;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }

  .modal-crud {
    .va-input {
      display: block;
    }
  }

  .exit {
    display: flex;
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
  }
}

.no-team {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;

  &__p {
    //margin: 1rem;
    font-size: 2rem;
    font-family: Microsoft YaHei, serif;
  }

  &__button {
    margin-top: 2rem;
    margin-bottom: 15rem;
  }
}
</style>
