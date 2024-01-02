<template>
  <va-card stripe stripe-color="primary" class="ma-3">
    <div class="button-back">
      <va-button color="info" gradient class="back-button" @click="router.push('/student/team/favor')">
        <va-icon name="logout"/>
        我的收藏
      </va-button>
      <va-button color="danger" gradient class="back-button" @click="router.push('/student/square/dormitory')">
        <va-icon name="logout"/>
        返回广场
      </va-button>
    </div>
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
        <div v-if="roomToView.selectedTeamCreatorId!==null">
          <va-chip
              shadow
              icon="hot_tub"
              :readonly="true"
          >
            选定的队长
          </va-chip>
          <va-chip
              outline
              class="ma-3"
          >
            {{ roomToView.selectedTeamCreatorId }}
          </va-chip>
          <va-button
              class="mt-2"
              round
              icon="search"
              :to="{name: 'SMateSelect',query: {search_id: roomToView.selectedTeamCreatorId }}"
          />

        </div>
        <div class="button-container">
          <span v-if="!isFavorite">
            <va-button color="info" gradient class="favorite-button" @click="favoriteRoom">
              <va-icon name="bookmark"/>
              收藏
            </va-button>
          </span>
          <span v-else>
            <va-button color="info" text-color="warning" gradient class="favorite-button" @click="cancelFavorite">
              <va-icon name="bookmark_added"/>
              取消收藏
            </va-button>
          </span>

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
          <div v-for="(comment, commentIndex) in displayedComments" class="comment">
            <va-avatar
                :src="comment.avatar"
                fallback-src="src/assets/avatar1.png"
            />
            <div class="comment-content">
              <p class="comment-author">{{ comment.author }}</p>
              <p class="comment-text">{{ comment.content }}</p>
              <!-- 回复按钮 -->
              <va-button style="margin: 5px" @click="toggleReplies(commentIndex)" color="info" gradient class="mr-6 mb-2">
                {{comment.showReplies?'收起回复':'查看回复'}}
              </va-button>
              <va-button style="margin: 5px" @click="deleteComment(comment)" color="danger" gradient v-if="comment.authorId === accountStore.accountCampusId">
                删除评论
              </va-button>
              <!-- 回复输入框 -->
              <div v-if="comment.showReplies" class="reply-input">
                <va-textarea v-model="newReply[commentIndex]" placeholder="回复评论..." class="reply-in"></va-textarea>
                <va-button @click="addReply(commentIndex)" color="info" gradient class="mr-6 mb-2">发表回复</va-button>
              </div>
              <!-- 回复列表 -->
              <div v-if="comment.showReplies" class="reply-list">
                <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply">
                  <va-avatar
                      :src="reply.avatar"
                      fallback-src="src/assets/avatar1.png"
                  />
                  <div class="reply-content">
                    <p class="reply-author">{{ reply.authorName }}</p>
                    <p class="reply-text">{{ reply.content }}</p>
                    <va-button @click="deleteReply(reply)" gradient color="danger" v-if="reply.author === accountStore.accountCampusId">删除回复</va-button>
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
  </va-card>
  <va-modal
      v-model="dialogVisible"
      :message="roomStore.msg"
      ok-text="确认"
      cancel-text="取消"
      size="small"
  />
</template>

<script setup>
import {computed, ref, reactive, onMounted, onBeforeUnmount} from 'vue';
import Room1Image from '@/assets/Room1.jpg';
import Room2Image from '@/assets/Room2.png';
import {useRoomStore} from "@/store/room.js";
import {useRouter} from "vue-router";
import {useTeamStore} from "@/store/team.js";
import {useAccountStore} from "@/store/account.js";
import {useToast} from "vuestic-ui";
import {usePictureStore} from "@/store/picture.js";

const router = useRouter()
const roomStore = useRoomStore()
const teamStore = useTeamStore()
const accountStore = useAccountStore()
const pictureStore = usePictureStore()
const dialogVisible = ref(false)
const {init} = useToast()

const roomDisplayItems = [
  {label: '区划', valueBy: 'district', icon: 'grid_on'},
  {label: '楼栋', valueBy: 'building', icon: 'apartment'},
  {label: '楼层', valueBy: 'floor', icon: 'stairs'},
  {label: '房间', valueBy: 'roomNumber', icon: 'living'},
  {label: '户型', valueBy: 'roomType', icon: 'diversity_3'},
  {label: '性别', valueBy: 'gender', icon: 'wc'}
]

const roomToView = computed(() => {
  return roomStore.roomToView
})

onMounted(async () => {
  await accountStore.refreshSession()
  await teamStore.fetchTeamInformation(accountStore.accountCampusId)
  await roomStore.findRoomToView(window.sessionStorage.getItem("roomId"))
  await roomStore.getComments()
  await pictureStore.fetchAvatar(accountStore.accountCampusId)
})

const isCreator = computed(() => {
  return accountStore.accountCampusId === teamStore.current_team.creatorId
})

const isFavorite = computed(() => {
  let flag = false
  teamStore.current_team.favoriteRooms.forEach((room) => {
    if (room.roomId === roomStore.roomToView.roomId)
      flag = true
  })
  return flag
})

const favoriteRoom = async () => {
  if (!teamStore.joined) {
    init('请先加入队伍！')
    return
  }
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
    content: newReply.value[commentIndex],
  }
  await roomStore.addReply(reply)
  roomStore.comments[commentIndex].replies.push({
    authorId: accountStore.accountCampusId,
    authorName: accountStore.studentInformationForm.name,
    parentId: roomStore.comments[commentIndex].commentId,
    content: newReply.value[commentIndex],
    avatar: pictureStore.userAvatar
  })
  roomStore.comments[commentIndex].showReplies = true
  newReply.value[commentIndex] = '';
};

async function deleteComment(comment)
{
  await roomStore.deleteComment(comment.commentId)
  await roomStore.getComments()
  dialogVisible.value = true
}

async function deleteReply(reply)
{
  await roomStore.deleteReply(reply.secondCommentId)
  await roomStore.getComments()
  dialogVisible.value = true
}

function contactLeader(studentId) {
  router.push({
    name: 'SMateSelect',
    query: {
      search_id: studentId
    }
  })
}

</script>

<style scoped>
.button-back {
  margin-left: 1000px;
}

.room-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.images {
  flex: 1;
  margin-left: 50px;
  margin-top: 50px;
  width: 200px;
  max-width: 500px;
}

.room-intro {
  flex: 1;
  margin-top: 50px;
  margin-left: 50px;
  font-size: 25px;
  align-self: flex-start;
  line-height: 2.0;
  max-width: 500px;
}

.room-info {
  flex: 1;
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 25px;
  align-self: flex-start;
  line-height: 2.0;
  max-height: 300px;
  overflow-y: auto;
}

.description {
  text-align: center;
  font-family: HGY3, serif;
  font-size: 1rem;
}

.information {
  text-align: left;
  text-indent: 2em;
  font-family: HGY3, serif;
  font-size: 1rem;
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

.info-item {
  //font-family: HGY3, serif;
  //margin: 0.5rem;
  font-size: 1rem;
}

</style>
