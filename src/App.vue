<script setup>
import {onBeforeUnmount, onMounted} from "vue";
import {useAccountStore} from "@/store/account.js";
import {useNotificationStore} from "@/store/notification.js";
import {useMessageStore} from "@/store/message.js";


</script>

<template>
  <router-view/>
</template>

<style>
@import "assets/page_style.scss";
</style>
