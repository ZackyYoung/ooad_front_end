<script setup>
import {onBeforeUnmount, onMounted} from "vue";
import {useAccountStore} from "@/store/account.js";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";
const accountStore = useAccountStore()
const messageStore = useMessageStore()
const notificationStore = useNotificationStore()

onMounted(async () =>{
  await accountStore.refreshSession()
  if(accountStore.accountCampusId !== "")
  {
    messageStore.messageWebsocketInit(accountStore.accountCampusId)
    notificationStore.notificationWebsocketClose(accountStore.accountCampusId)
  }
})
onBeforeUnmount(async () =>{
  if(accountStore.accountCampusId !== "")
  {
    messageStore.messageStoreClose()
    notificationStore.notificationWebsocketClose()
  }
})
</script>

<template>
  <router-view/>
</template>

<style>
@import "assets/page_style.scss";
</style>
