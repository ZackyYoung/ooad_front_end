<template>
  <div id="app" class="Notification">
    <div class="sidebar">
      <VaListItem class="search-box">
        <VaListItemSection class="search-text">
          <VaInput v-model="searchInput" placeholder="搜索" @input="searchNotification" />
        </VaListItemSection>
      </VaListItem>

      <VaScrollContainer class="max-h-52" vertical>
        <VaList>
          <VaListItem
              v-for="notification in filteredNotification" :key="notification.id" @click="selectNotification(notification)"
              class="list__item"
              :class="{ 'selected': selectedNotification === notification }"
          >
            <VaListItemSection v-if="notification.type === 'comment'">
              <VaIcon name="comment" class="notification-icon" size="32px"/>
            </VaListItemSection>

            <VaListItemSection v-else-if="notification.type === 'invitation'">
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

            <div v-if="notification.unread > 0" class="notification-unread"></div>
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
              {{ selectedNotification.text.sender + "回复了你："}}
            </div>
            <div class="comment-content">
              {{ selectedNotification.text.content }}
            </div>
          </div>
          <div v-else-if="selectedNotification.type === 'invitation'">
            <div class="comment-sender">
              {{ selectedNotification.text.inviter + "邀请你加入" + selectedNotification.text.teamName}}
            </div>
            <div class="comment-content">
              {{ selectedNotification.text.content }}
            </div>
          </div>
          <div v-else-if="selectedNotification.type === 'roomExchange'">
            <div class="comment-sender">
              {{ selectedNotification.text.teamName + "队伍申请和您的队伍交换房间"}}
            </div>
          </div>
          <div v-else>
            <div class="comment-sender">
              {{ selectedNotification.text.subject }}
            </div>
            <div class="comment-content">
              {{ selectedNotification.text.content }}
            </div>
          </div>
        </div >
        <div class="button-container">
          <div v-if="selectedNotification.type === 'comment'" class="button-to-room">
            <va-button color="info" @click="viewComment">查看</va-button>
          </div>
<!--          评论发送者为用户自己时才显示删除按钮-->
          <div v-if="selectedNotification.type === 'comment'&&selectedNotification.text.sender===currentUser.name" class="delete-comment">
            <va-button color="danger" @click="deleteComment">删除</va-button>
          </div>
          <div v-if="selectedNotification.type === 'invitation'" class="invitation-buttons">
            <va-button color="success" @click="acceptInvitation()" class="agree-button">同意</va-button>
            <va-button color="info" @click="viewTeamInfo()" class="check-info-button">查看队伍信息</va-button>
            <va-button color="danger" @click="rejectInvitation()" class="reject-button">拒绝</va-button>
          </div>
          <div v-if="selectedNotification.type === 'roomExchange'" class="exchange-buttons">
            <va-button color="success" @click="acceptExchange()" class="agree-button">同意</va-button>
            <va-button color="info" @click="viewRoomInfo()" class="check-info-button">查看房间信息</va-button>
            <va-button color="danger" @click="rejectExchange()" class="reject-button">拒绝</va-button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="select-message">Select a notification to check</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    //生成的消息数据中，未读消息排在已读消息上面，未读消息和已读消息均按时间先后排序
    const generateNotifications = (count, currentUser) => {
      const messages = [];
      for (let i = 1; i <= count; i++) {
        let type;
        if (i % 4 === 0) {
          type = 'invitation';
        } else if (i % 3 === 0){
          type = 'roomExchange'
        } else {
          type = i % 2 === 0 ? 'comment' : 'system';
        }
        const hasUnread = Math.random() < 0.5;
        const timestamp = generateRandomTimestamp();
        const notification = {
          id: i,
          type,
          name: `Notification ${i}`,
          unread: hasUnread,
          text: generateRandomNotifications(type, currentUser),
          timestamp,
        };
        messages.push(notification);
      }
      messages.sort((a, b) => {
        if (a.unread !== b.unread) {
          return a.unread ? -1 : 1;
        }
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      return messages;
    };

    const generateRandomTimestamp = () => {
      const start = new Date('2023-01-01');
      const end = new Date();
      const randomTimestamp = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return randomTimestamp.toISOString();
    };

    const generateRandomNotifications = (type, currentUser) => {
      if (type === 'comment') {
        const commentMessages = [
          { sender: 'Alice', content: 'Great post!'},
          { sender: 'Bob', content: 'I have a question.'},
          { sender: currentUser.name, content: 'This is my comment.' },
          // Add more comment examples as needed
        ];
        const randomIndex = Math.floor(Math.random() * commentMessages.length);
        return commentMessages[randomIndex];
      } else if (type === 'system') {
        const systemMessages = [
          { subject: 'Important Update', content: 'There is an important update for all users.'},
          { subject: 'New Feature', content: 'Explore the new features in our latest release!'},
          // Add more system message examples as needed
        ];
        const randomIndex = Math.floor(Math.random() * systemMessages.length);
        return systemMessages[randomIndex];
      } else if (type === 'invitation') {
        const invitationMessages = [
          { inviter: 'John', teamName: 'Team A', content: '加入我们的队伍吧！', timestamp: generateRandomTimestamp() },
          { inviter: 'Jane', teamName: 'Team B', content: '一起组队吗？', timestamp: generateRandomTimestamp() },
          // 添加更多邀请消息的例子
        ];
        const randomIndex = Math.floor(Math.random() * invitationMessages.length);
        return invitationMessages[randomIndex];
      } else if (type === 'roomExchange') {
        const exchangeMessages = [
          { teamName: 'TeamA'},
          { teamName: 'TeamB'},
        ];
        const randomIndex = Math.floor(Math.random() * exchangeMessages.length);
        return exchangeMessages[randomIndex];
      }
    };

    const currentUser = {
      name: 'Yujian',
      ID: '12111506'
    };
    const notifications = ref(generateNotifications(15, currentUser));
    const selectedNotification = ref(null);
    const searchInput = ref('');
    const filteredNotification = ref(notifications.value);
    const searchNotification = () => {
      if (searchInput.value.trim() === '') {
        filteredNotification.value = notifications.value;
      } else {
        filteredNotification.value = notifications.value.filter(notifications =>
            notifications.name.toLowerCase().includes(searchInput.value.toLowerCase())
        );
      }
    };
    const selectNotification = (notification) => {
      notification.unread = 0;
      selectedNotification.value = notification;
    };

    const viewComment = () => {

    };

    const deleteComment = () => {

    };

    const acceptInvitation = () => {

    };

    const rejectInvitation = () => {

    };

    const viewTeamInfo = () => {

    };

    const acceptExchange = () => {

    };

    const viewRoomInfo = () => {

    };

    const rejectExchange = () => {

    };

    return {
      notifications,
      selectedNotification,
      selectNotification,
      currentUser,
      searchInput,
      searchNotification,
      filteredNotification,
      viewComment,
      deleteComment,
      acceptInvitation,
      rejectInvitation,
      viewTeamInfo,
      acceptExchange,
      viewRoomInfo,
      rejectExchange,
    };
  },
};
</script>

<style scoped>
#app {
  display: flex;
  height: 80vh;
  margin-top: 50px;
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

.agree-button{
  margin-top: 20px;
  margin-left: 220px;
}

.reject-button{
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
