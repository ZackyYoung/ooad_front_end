<template>
  <div id="app" class="chat">
    <div class="sidebar">
      <VaListItem class="search-box">
        <VaListItemSection class="search-text">
          <VaInput v-model="searchInput" placeholder="搜索" @input="searchUsers" />
        </VaListItemSection>
      </VaListItem>

      <VaScrollContainer class="max-h-52" vertical>
        <VaList>
          <VaListItem
              v-for="(chat, index) in filteredChats" :key="index" @click="selectChat(chat)"
              class="list__item"
              :class="{ 'selected': selectedChat === chat }"
          >
            <VaListItemSection avatar style="padding: 6px">
              <VaAvatar
                  :src="chat.slaveAvatar"
                  fallback-src="src/assets/avatar1.png"
              />
            </VaListItemSection>

            <VaListItemSection>
              <VaListItemLabel>
                {{ chat.slaveName }}
              </VaListItemLabel>
            </VaListItemSection>

            <div v-if="unReadNum(chat)" class="unread">{{ unReadNum(chat) }}</div>
          </VaListItem>
        </VaList>
      </VaScrollContainer>
    </div>
    <div class="chat-window">
      <div v-if="selectedChat">
        <div class="chat-header">
          <h2 style="margin-left: 30px;">{{ selectedChat.slaveName }}</h2>
        </div>

        <VaScrollContainer class="max-h-52" vertical>
          <VaList class="chat-list">
            <VaListItem v-for="(chatMessage, index) in selectedChat.messages" :key="index">
              <VaListItemSection v-if="chatMessage.senderId !== accountStore.accountCampusId" avatar style="padding: 6px" class="sent-message">
                <VaAvatar
                    :src="selectedChat.slaveAvatar"
                    fallback-src="src/assets/avatar1.png"
                />
              </VaListItemSection>

              <VaListItemSection v-if="chatMessage.senderId !== accountStore.accountCampusId" class="text-left">
                <VaListItemLabel >
                  {{ chatMessage.content }}
                </VaListItemLabel>
              </VaListItemSection>

              <VaListItemSection v-if="chatMessage.senderId === accountStore.accountCampusId" class="text-right">
                <VaListItemLabel >
                  {{ chatMessage.content }}
                </VaListItemLabel>
              </VaListItemSection>

              <VaListItemSection v-if="chatMessage.senderId === accountStore.accountCampusId" avatar style="padding: 6px" class="received-message">
                <VaAvatar
                    :src="selectedChat.masterAvatar"
                    fallback-src="src/assets/avatar1.png"
                />
              </VaListItemSection>
            </VaListItem>
          </VaList>
        </VaScrollContainer>



        <div class="message-input">
          <textarea v-model="newMessage" class="input-text" ></textarea>
          <va-button @click="sendMessage" color="info" gradient class="mr-6 mb-2">发送</va-button>
        </div>
      </div>
      <div v-else>
        <p class="select-message">选择一个聊天查看</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, toRef} from 'vue';
import {useAccountStore} from "@/store/account.js";
import {useMessageStore} from "@/store/message.js";

const accountStore = useAccountStore()
const messageStore = useMessageStore()

onMounted(async ()=>{
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
})

function unReadNum(chat){
  return chat.messages.filter(message =>
      message.receiverId === accountStore.accountCampusId
      && message.read === false).length
}

const selectedChat = ref(null);
const newMessage = ref('');

const searchInput = ref('');
const filteredChats = toRef(messageStore.chatData);
const searchUsers = () => {
  if (searchInput.value.trim() === '') {
    filteredChats.value = messageStore.chatData;
  } else {
    filteredChats.value = messageStore.chatData.filter(chat =>
        chat.slaveName.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }
};

async function selectChat(chat){
  if(chat.messages.length !== 0)
    await messageStore.readMessage(chat)
  selectedChat.value = chat;
}

const sendMessage = async () => {
  if (selectedChat.value && newMessage.value.trim() !== '') {
    const message = {
      senderId: accountStore.accountCampusId,
      senderName: accountStore.studentInformationForm.name,
      receiverId: selectedChat.value.slaveId,
      content: newMessage.value
    };
    selectedChat.value.messages.push(message);
    newMessage.value = '';
    await messageStore.sendMessage(message)
  }
};

</script>

<style scoped>
#app {
  display: flex;
  height: 80vh;
  margin-top: 50px;
  margin-left: 100px;
}

.chat {
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

.search-box {
  flex: 1;
  padding: 10px;
  background-color: #e7e7e7;
  border: solid 1px #dadada;
  height: 60px;
}

.search-text{
  background-color: #d3d2d2;
  margin-right: 10px;
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

.unread {
  background-color: #ff0000;
  color: #ffffff;
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 100%;
  margin-right: 15px;
}

.chat-window {
  display: flex;
  flex-direction: column;  /* 调整 flex 方向为列 */
  justify-content: space-between;  /* 添加这一行以将头部、消息和输入框分隔开 */
  height: 600px;
  width: 700px;
  background-color: #f3f3f3;
  border: solid 1px #dadada;
}

.chat-header {
  background-color: #e7e7e7;
  color: #000000;
  height: 60px;
  font-size: 20px;
  padding: 12px;
}

.chat-list {
  border: solid 1px #dadada;
  overflow-y: auto;  /* 添加这一行以启用垂直滚动条 */
  max-height: 425px;  /* 调整这里，确保消息列表在聊天框内显示，并留出底部用于输入框 */
}

.text-right {
  text-align: right;
}

.select-message {
  text-align: center;
  font-style: italic;
  color: #888;
}
.message-input {
  display: flex;
  position: absolute;
  bottom: 111px;
  height: 125px;
  width: 700px;
  border: solid 1px #dadada;
}

.message-input textarea {
  flex: 1;
  padding: 10px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 500px;
  height: 50px;
}

.message-input button {
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
  height: 70px;
}

</style>
