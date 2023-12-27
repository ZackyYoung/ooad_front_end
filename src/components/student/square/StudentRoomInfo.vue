<template>
  <div class="room-container">
    <div class="images">
      <va-carousel v-model="imagePage" :items="items" :ratio="16 / 9" />
    </div>
    <div class="room-intro" >
      <p>区划：{{roomToView.district}}</p>
      <p>楼栋: {{ roomToView.building }}</p>
      <p>楼层: {{ roomToView.floor }}</p>
      <p>房间: {{ roomToView.roomNumber }}</p>
      <p>户型: {{ roomToView.roomType }}</p>
      <p>宿舍性别: {{ roomToView.gender }}</p>
      <p>选中当前房间队伍的队长学号: {{roomToView.selectedTeamCreatorId}}</p>
      <div class="button-container">
        <div v-if="!isFavorite">
          <va-button color="info" gradient class="favorite-button"  @click="favoriteRoom">
            <va-icon name="star"></va-icon>
              收藏
          </va-button>
        </div>
        <div v-else>
          <va-button color="info" text-color="warning" gradient class="favorite-button" @click="cancelFavorite">
            <va-icon name="star"></va-icon>
            取消收藏
          </va-button>
        </div>
        <va-button color="danger" gradient class="back-button" @click="router.push('/student/square/dormitory')">
          <va-icon name="logout"></va-icon>
            返回
        </va-button>
        <va-button
            v-if="isCreator
            && roomToView.selectedTeamCreatorId !== null
            && roomToView.selectedTeamCreatorId !== accountStore.accountCampusId
            && teamStore.roomSelected"
            color="success"
            gradient
            class="change-button"
            @click="changeOwner"
        >
          <va-icon name="sync"></va-icon>
          申请交换
        </va-button>
      </div>
    </div>
    <div class="room-info" >
      <p class="description">简介</p>
      <p class="information">{{roomToView.description}}</p>
    </div>
  </div>

  <va-card class="comment-card">
    <va-card-title style="font-size: 20px">评论区</va-card-title>
    <va-card-content>
      <div class="comment-section">
        <!-- 评论输入框 -->
        <div class="comment-input">
          <va-textarea v-model="newComment" placeholder="说点什么吧..." class="comment-in"></va-textarea>
          <va-button @click="addComment" color="info" gradient class="mr-6 mb-2">发表评论</va-button>
        </div>

        <!-- 评论列表 -->
        <div v-for="(comment, commentIndex) in displayedComments" :key="commentIndex" class="comment">
          <div class="user-avatar">
            <!-- 用户头像，你可以使用真实头像或者图标 -->
            <img src="@/assets/avatar1.png" alt="User Avatar">
          </div>
          <div class="comment-content">
            <p class="comment-author">{{ comment.author }}</p>
            <p class="comment-text">{{ comment.content }}</p>
            <!-- 回复按钮 -->
            <va-button @click="toggleReplies(commentIndex)" color="info" gradient class="mr-6 mb-2">查看回复</va-button>
            <!-- 回复输入框 -->
            <div v-if="comment.showReplies" class="reply-input">
              <va-textarea v-model="newReply[commentIndex]" placeholder="回复评论..." class="reply-in"></va-textarea>
              <va-button @click="addReply(commentIndex)" color="info" gradient class="mr-6 mb-2">发表回复</va-button>
            </div>
            <!-- 回复列表 -->
            <div v-if="comment.showReplies" class="reply-list">
              <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply">
                <div class="user-avatar">
                  <!-- 用户头像 -->
                  <img src="@/assets/avatar2.png" alt="User Avatar">
                </div>
                <div class="reply-content">
                  <p class="reply-author">{{ reply.authorName }}</p>
                  <p class="reply-text">{{ reply.content }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 加载更多评论按钮 -->
        <va-button
            v-if="!showAllComments && roomStore.comments.length > 10"
            @click="loadMoreComments"
            color="info"
            gradient
            class="mr-6 mb-2"
        >
          加载更多评论
        </va-button>
      </div>
    </va-card-content>
  </va-card>
</template>>

<script setup>
import {computed, ref, reactive, onMounted, onBeforeUnmount} from 'vue';
import Room1Image from '@/assets/Room1.jpg';
import Room2Image from '@/assets/Room2.png';
import {useRoomStore} from "@/store/room.js";
import {useRouter} from "vue-router";
import {useTeamStore} from "@/store/team.js";
import {useAccountStore} from "@/store/account.js";
import {useToast} from "vuestic-ui";

const router = useRouter()
const roomStore = useRoomStore()
const teamStore = useTeamStore()
const accountStore = useAccountStore()
const {init} = useToast()
const roomToView = computed(() => {
  return roomStore.roomToView
})

onMounted(async ()=>{
  await accountStore.refreshSession()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  await roomStore.findRoomToView(window.sessionStorage.getItem("roomId"))
  await roomStore.getComments()
})

const isCreator = computed(()=>{
  return accountStore.accountCampusId === teamStore.current_team.creatorId
})

const isFavorite = computed(() => {
  let flag = false
  teamStore.current_team.favoriteRooms.forEach((room) => {
    if(room.roomId === roomStore.roomToView.roomId)
      flag = true
  })
  return flag
})

const favoriteRoom = async () => {
  await roomStore.favoriteRoom(accountStore.accountCampusId, roomStore.roomToView.building, roomStore.roomToView.roomNumber)
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
}

const cancelFavorite = async () => {
  await roomStore.cancelFavorite(accountStore.accountCampusId, roomStore.roomToView.building, roomStore.roomToView.roomNumber)
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
}

const changeOwner = async () => {
  // if(teamStore.current_team.teamMembers.length !== roomStore.roomToView.roomType)
  //   init('你的队伍人数与该房型不符')
  // else
  {
    await teamStore.applySwap(accountStore.accountCampusId, roomStore.roomToView.selectedTeamCreatorId)
    init('申请交换已发送')
  }
}

const imagePage = ref(0);
const items = [
  Room1Image,
  Room2Image,
  Room1Image,
  Room2Image,
];




const showAllComments = ref(false);
const newComment = ref('');
const newReply = ref([]);

// 计算属性

const displayedComments = computed(() => {
  return showAllComments.value ? roomStore.comments : roomStore.comments.slice(0, 10);
});

// 方法
const toggleReplies = (commentIndex) => {
  roomStore.comments[commentIndex].showReplies = !roomStore.comments[commentIndex].showReplies;
};

const loadMoreComments = () => {
  showAllComments.value = !showAllComments.value;
};

const addComment = async () => {
  await roomStore.addComment({
    authorId: accountStore.accountCampusId,
    authorName: accountStore.studentInformationForm.name,
    buildingId: roomStore.roomToView.building,
    roomNumber: roomStore.roomToView.roomNumber,
    content: newComment.value
  })
  await roomStore.getComments()
  newComment.value = '';
};

const addReply = async (commentIndex) => {
  let reply = {
    authorId: accountStore.accountCampusId,
    authorName: accountStore.studentInformationForm.name,
    parentId: roomStore.comments[commentIndex].commentId,
    content: newReply.value[commentIndex]
  }
  await roomStore.addReply(reply)
  roomStore.comments[commentIndex].replies.push(reply)
  roomStore.comments[commentIndex].showReplies = true
  newReply.value[commentIndex] = '';
};

</script>

<style>
.room-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.images {
  flex: 1;
  margin-left: 100px;
  margin-top: 100px;
  width: 300px;
}

.room-intro {
  flex: 1;
  margin-top: 100px;
  margin-left: 50px;
  font-size: 25px;
  align-self: flex-start;
  line-height: 2.0;
  max-width: 250px;
}

.room-info {
  flex: 1;
  margin-top: 100px;
  margin-left: 0;
  margin-right: 10px;
  font-size: 25px;
  align-self: flex-start;
  line-height: 2.0;
  max-height: 300px;
  overflow-y: auto;
}

.description {
  text-align: center;
}

.information {
  text-align: left;
  text-indent: 2em;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
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
  flex: 1;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 120px;
  height: 50px;
  font-size: 50px;
}
.change-button {
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


</style>
