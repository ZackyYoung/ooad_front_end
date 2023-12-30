<script setup>
import {onBeforeUnmount, onMounted} from "vue";
import {useAccountStore} from "@/store/account.js";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";
import {usePictureStore} from "@/store/picture.js";
const accountStore = useAccountStore()
const messageStore = useMessageStore()
const notificationStore = useNotificationStore()
const pictureStore = usePictureStore()

onMounted(async () =>{
  await accountStore.refreshSession()
  if(accountStore.accountCampusId !== null)
  {
    messageStore.messageWebsocketInit(accountStore.accountCampusId)
    notificationStore.notificationWebsocketInit(accountStore.accountCampusId)
  }
})
onBeforeUnmount(async () =>{
  if(accountStore.accountCampusId !== null)
  {
    messageStore.messageStoreClose()
    notificationStore.notificationStoreClose()
    pictureStore.pictureStoreClose()
  }
})
</script>

<template>
  <router-view/>
</template>

<style>
@import "assets/page_style.scss";
</style>
