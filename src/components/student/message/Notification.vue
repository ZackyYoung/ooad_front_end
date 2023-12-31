<template>
  <va-card class="page-content-card">
    <va-button
        icon="delete"
        class="mt-2"
        style="margin-left: 6rem"
        @click="deleteAllNotif"
    >
      清空消息
    </va-button>
    <div id="app" class="Notification">
      <div class="sidebar">
        <VaListItem class="search-box">
          <VaListItemSection class="search-text">
            <VaInput v-model="searchInput" placeholder="搜索"/>
          </VaListItemSection>
        </VaListItem>

        <VaScrollContainer class="max-h-52" vertical>
          <VaList>
            <VaListItem
                v-for="(notification, index) in filteredNotification" :key="index"
                @click="readNotification(notification)"
                class="list__item"
                :class="{ 'selected': selectedNotification === notification }"
            >
              <VaListItemSection v-if="notification.type === 'comment'">
                <VaIcon name="comment" class="notification-icon" size="32px"/>
              </VaListItemSection>

              <VaListItemSection v-else-if="notification.type === 'invitation' || notification.type === 'application' ">
                <VaIcon name="groups" class="notification-icon" size="32px"/>
              </VaListItemSection>

              <VaListItemSection v-else-if="notification.type === 'system'">
                <VaIcon name="notifications" class="notification-icon" size="32px"/>
              </VaListItemSection>

              <VaListItemSection v-else-if="notification.type === 'roomExchange'">
                <VaIcon name="sync" class="notification-icon" size="32px"/>
              </VaListItemSection>

              <VaListItemSection class="notification-name">
                <VaListItemLabel>
                  {{ notification.name }}
                </VaListItemLabel>
              </VaListItemSection>

              <div v-if="!notification.read" class="notification-unread"></div>
            </VaListItem>
          </VaList>
        </VaScrollContainer>
      </div>
      <div class="notification-window">
        <div v-if="selectedNotification">
          <div class="notification-header">
            <h2 style="margin-left: 30px;">{{ selectedNotification.name }}</h2>
          </div>

          <div class="notification-content">
            <div v-if="selectedNotification.type === 'comment'">
              <div v-if="selectedNotification.text.sender === currentUser.name" class="comment-sender">
                {{ "评论成功!" }}
              </div>
              <div v-else class="comment-sender">
                {{ selectedNotification.text.sender + " 回复了你：" }}
              </div>
              <div class="comment-content">
                {{ selectedNotification.text.content }}
              </div>
            </div>
            <div v-else-if="selectedNotification.type === 'invitation'">
              <div class="comment-sender">
                {{ selectedNotification.text.teamName + "邀请你加入" }}
              </div>
            </div>
            <div v-else-if="selectedNotification.type === 'application'">
              <div class="comment-sender">
                {{ selectedNotification.text.senderName + "申请加入你的队伍" }}
              </div>
            </div>
            <div v-else-if="selectedNotification.type === 'roomExchange'">
              <div class="comment-sender">
                {{ selectedNotification.text.applyTeamName + "队伍申请和您的队伍交换房间" }}
              </div>
            </div>
            <div v-else>
              <div class="comment-content">
                {{ selectedNotification.text }}
              </div>
            </div>
          </div>
          <div style="text-align: center">
            <div v-if="selectedNotification.type === 'invitation' || selectedNotification.type === 'application' "
                 class="invitation-buttons">
              <va-button color="info" @click="viewInvitation(selectedNotification)" class="check-info-button">前往查看
              </va-button>
            </div>
          </div>
          <div class="button-container">
            <div v-if="selectedNotification.type === 'roomExchange'" class="exchange-buttons">
              <va-button color="success" @click="acceptExchange(selectedNotification)" class="agree-button">同意
              </va-button>
              <va-button color="info" @click="viewRoomInfo(selectedNotification.text.applyRoom)"
                         class="check-info-button">查看房间信息
              </va-button>
              <va-button color="danger" @click="rejectExchange(selectedNotification)" class="reject-button">拒绝
              </va-button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="select-message">选择一个通知查看</p>
        </div>
      </div>
    </div>
  </va-card>
</template>

<script setup>
import {computed, onMounted, ref, toRef} from 'vue';
import {useAccountStore} from "@/store/account.js";
import {useNotificationStore} from "@/store/notification.js";
import {useRouter} from "vue-router";
import {useTeamStore} from "@/store/team.js";
import {useRoomStore} from "@/store/room.js";
import {useToast} from "vuestic-ui";

const accountStore = useAccountStore();
const notificationStore = useNotificationStore()
const teamStore = useTeamStore()
const roomStore = useRoomStore()
const router = useRouter()
const {init} = useToast()

onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
})

//生成的消息数据中，未读消息排在已读消息上面，未读消息和已读消息均按时间先后排序


const currentUser = {
  name: accountStore.studentInformationForm.name,
  ID: accountStore.accountCampusId
};
const notifications = toRef(notificationStore.notificationData)
const selectedNotification = ref(null);
const searchInput = ref('');
const filteredNotification = computed(() => {
  if (searchInput.value.trim() === '') {
    return notifications.value;
  } else {
    return notifications.value.filter(notifications =>
        notifications.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }
})

async function readNotification(notification) {
  await notificationStore.readNotification(notification)
  selectedNotification.value = notification;
}

const viewInvitation = (notification) => {
  router.push('/student/team/invitation')
};

const acceptExchange = async (notification) => {
  await teamStore.swapRoom(notification.text.applyRoomId, teamStore.selectedRoom.roomId)
  await teamStore.getSelectedRoom(teamStore.current_team.teamId)
  await notificationStore.deleteNotification(notification)
  init('交换成功')
}

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

const rejectExchange = async (notification) => {
  await notificationStore.deleteNotification(notification)
}

const deleteAllNotif = async ()=>{
  await notificationStore.deleteAllNotification(accountStore.accountCampusId)
}

</script>

<style scoped>
#app {
  display: flex;
  height: 80vh;
  margin-top: 20px;
  margin-left: 100px;
}

.Notification {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.sidebar {
  width: 300px;
  height: 600px;
  background-color: #ededed;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border: solid 1px #dadada;
  display: flex;
  flex-direction: column;
}

.notification-icon {
  margin: 15px;
}

.notification-name {
  margin-left: 50px;
}

.list__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.list__item:hover {
  background-color: #dcdcdc;
}

.list__item.selected {
  background-color: #bdbdbd;
  color: #fff;
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}


.friend-info h3 {
  margin: 0;
}

.notification-unread {
  background-color: #ff0000;
  color: #ffffff;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin-right: 15px;
}

.notification-window {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 600px;
  width: 700px;
  background-color: #f3f3f3;
  border: solid 1px #dadada;
}

.notification-header {
  background-color: #e7e7e7;
  color: #000000;
  height: 60px;
  font-size: 20px;
  padding: 12px;
}

.notification-content {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 50px;
  margin-top: 50px;
  margin-right: 50px;
  height: 400px;
  max-height: 400px;
  overflow-y: auto;
}

.select-message {
  text-align: center;
  font-style: italic;
  color: #888;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button-to-room {
  margin-top: 20px;
  margin-left: 250px;
}

.delete-comment {
  margin-top: 20px;
  margin-right: 250px;
}

.agree-button {
  margin-top: 20px;
  margin-left: 220px;
}

.reject-button {
  margin-top: 20px;

}

.check-info-button {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.comment-sender {
  font-size: 20px;
  margin: 20px;
}

.comment-content {
  font-size: 18px;
  margin-left: 40px;
  line-height: 1.5;
}
</style>
