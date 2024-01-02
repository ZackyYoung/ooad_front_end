<template>
  <va-card class="page-content-card card-fix">
    <div class="room-container">
      <div class="images">
        <va-carousel v-model="imagePage" :items="items" :ratio="16 / 9"/>
      </div>
      <div class="room-intro">
        <div v-for="displayItem in roomDisplayItems">
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
            {{ roomToView[displayItem.valueBy] }}栋
            </span>
            <span v-else-if="displayItem.label==='楼层'">
              {{ roomToView[displayItem.valueBy] }}层
            </span>
            <span v-else-if="displayItem.label==='户型'">
                <span v-if="roomToView[displayItem.valueBy] === 1">
                  单人间
                </span>
                <span v-else-if="roomToView[displayItem.valueBy] === 2">
                  双人间
                </span>
                <span v-else-if="roomToView[displayItem.valueBy] === 3">
                  三人间
                </span>
                <span v-else>
                  四人间
                </span>
            </span>
            <span v-else-if="displayItem.label==='性别'">
                {{ roomToView[displayItem.valueBy] }}生寝室
            </span>
            <span v-else>
            {{ roomToView[displayItem.valueBy] }}
          </span>
          </va-chip>
        </div>
        <va-button color="info" gradient class="favorite-button" @click="showEdit = true">
          <va-icon name="edit"></va-icon>
          编辑
        </va-button>
        <va-button color="danger" gradient class="favorite-button" @click="deleteRoom">
          <va-icon name="delete"></va-icon>
          删除
        </va-button>
        <va-button color="warning" gradient class="back-button" @click="router.push('/teacher/dormitory/edit')">
          <va-icon name="logout"></va-icon>
          返回
        </va-button>
      </div>
      <va-card
          class="room-info"
          outlined
      >
        <VaCardTitle class="description">简介</VaCardTitle>
        <VaCardContent>
          <p class="information">
            {{ roomToView.description ? roomToView.description : "没有额外介绍了~" }}
          </p>
        </VaCardContent>
      </va-card>
    </div>
    <va-modal
        v-model="showEdit"
        hide-default-actions
        cancel-text="取消"
    >
      <h3 class="va-h3">
        编辑房间: {{ roomStore.roomToView.building }}栋 {{ roomStore.roomToView.roomNumber }}
      </h3>
      <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
        <va-select
            v-model="form.roomType"
            class="mb-6"
            label="户型"
            placeholder="选择户型"
            :options="type_options"
            value-by="value"
        />
        <va-select
            v-model="form.gender"
            class="mb-6"
            label="宿舍性别"
            placeholder="选择宿舍性别"
            :options="gender_options"
            value-by="value"
        />
        <va-textarea
            v-model="form.description"
            label="简介"
            placeholder="请给出宿舍简介"
            autosize
        />
      </va-form>
      <template #footer>
        <va-button class="save-button"  @click="submit()">
          提交信息
        </va-button>
      </template>
    </va-modal>
    <va-modal
        v-model="dialogVisible"
        :message="roomStore.msg"
        ok-text="确认"
        cancel-text="取消"
        size="small"
    />
    <va-modal
        v-model="deleteMsgVisible"
        :message="roomStore.msg"
        ok-text="确认"
        cancel-text="取消"
        size="small"
        @click="router.push('/teacher/dormitory/edit')"
    />
  </va-card>
</template>

<script setup>
import {computed, ref, reactive, onMounted} from 'vue';
import Room1Image from '@/assets/Room1.jpg';
import Room2Image from '@/assets/Room2.png';
import {useRoomStore} from "@/store/room.js";
import {useRouter} from "vue-router";
import {degree_options, major_options} from "@/utils/UserOptions.js";
import {district_options, gender_options, type_options} from "@/utils/DomOptions.js";
import {useForm} from "vuestic-ui";

const {isValid, validate} = useForm('formRef')
const router = useRouter()
const roomStore = useRoomStore()
const roomToView = computed(() => {
  return roomStore.roomToView
})
const showEdit = ref(false)
const imagePage = ref(0)
const dialogVisible = ref(false)
const deleteMsgVisible = ref(false)
const items = [
  Room1Image,
  Room2Image,
  Room1Image,
  Room2Image,
];

const roomDisplayItems = [
  {label: '区划', valueBy: 'district', icon: 'grid_on'},
  {label: '楼栋', valueBy: 'building', icon: 'apartment'},
  {label: '楼层', valueBy: 'floor', icon: 'stairs'},
  {label: '房间', valueBy: 'roomNumber', icon: 'living'},
  {label: '户型', valueBy: 'roomType', icon: 'diversity_3'},
  {label: '性别', valueBy: 'gender', icon: 'wc'}
]

const form = reactive({
  district: roomStore.roomToView.district,
  building: roomStore.roomToView.building,
  roomNumber: roomStore.roomToView.roomNumber,
  floor: roomStore.roomToView.floor,
  gender: roomStore.roomToView.gender,
  roomType: roomStore.roomToView.roomType,
  description: roomStore.roomToView.description
})

async function submit(){
  showEdit.value = false
  await roomStore.editRoom(form)
  await roomStore.findRoomToView(roomStore.roomToView.roomId)
  dialogVisible.value = true
}

onMounted(async () => {
  await roomStore.findRoomToView(window.sessionStorage.getItem("roomId"))
})
const deleteRoom = async () => {
  await roomStore.deleteRoom()
  deleteMsgVisible.value = true
}

const buildingIdValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '楼栋号不能为空！';
  }
  if (!re.test(value)) {
    return '楼栋号必须为整数数字！'
  }
  if (Number(value) > 50) {
    return '楼栋号过大！'
  }
}

const floorValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '楼层不能为空！';
  }
  if (!re.test(value)) {
    return '楼层必须为整数数字！'
  }
  if (Number(value) > 20) {
    return '层数值过大！'
  }
}

const roomNumberValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '房间不能为空！';
  }
  if (!re.test(value)) {
    return '房间号必须为整数数字！'
  }
}
</script>

<style scoped>
.room-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.images {
  flex: 1;
  margin-left: 100px;
  margin-top: 100px;
  width: 200px;
  max-width: 500px;
}

.room-intro {
  flex: 1;
  margin-top: 100px;
  margin-left: 50px;
  font-size: 25px;
  align-self: flex-start;
  line-height: 2.0;
  min-width: 450px;
}

.room-info {
  flex: 1;
  margin-top: 100px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 25px;
  align-self: flex-start;
  line-height: 2.0;
  max-height: 300px;
  overflow-y: auto;
}

.description {
  text-align: left;
  text-indent: 2em;
  font-family: HGY3, serif;
  font-size: 1rem;
}

.information {
  text-align: left;
  text-indent: 2em;
  font-family: HGY3, serif;
  font-size: 1rem;
}

.favorite-button {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 120px;
  height: 50px;
  font-size: 50px;
}

.back-button {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 120px;
  height: 50px;
  font-size: 50px;
}


.comment-card {
  margin-left: 100px;
  margin-top: 100px;
  margin-right: 100px;
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.comment-section {
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
}

.comment-input {
  display: flex;
  margin-top: 5px;
  margin-bottom: 30px;
  margin-left: 20px;
  width: 100%;
  padding: 10px;
}

.comment-in {
  margin-left: 0;
  margin-right: 10px;
  height: 100px;
  width: 80%;
  padding-bottom: 7px;
}

.comment {
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}

.comment-content {
  margin-left: 0;
  flex: 1;
  justify-content: flex-start;
  padding: 10px;
}

.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 0;
  text-align: left;
}

.comment-text {
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: left;
}

.reply-input {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  padding: 10px;
}

.reply-in {
  margin-left: 0;
  margin-right: 10px;
  height: 100px;
  width: 80%;
  padding-bottom: 7px;
}

.reply-list {
  margin-top: 10px;
}

.reply {
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
}

.reply .user-avatar img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;
}

.reply-content {
  flex: 1;
  padding: 10px;
  justify-content: flex-start;
}

.reply-author {
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

.reply-text {
  margin-bottom: 10px;
  text-align: left;
}

.card-fix{
  padding-bottom: 10rem;
}

</style>
