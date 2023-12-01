<script setup>
import {onMounted} from "vue";
import {useAccountStore} from "@/store/account.js";
const accountStore = useAccountStore()
onMounted(async () => {
  await accountStore.refreshSession()
  await accountStore.fetchInformation()
})
</script>

<template>
  <router-view/>
</template>

<style>
@import "assets/page_style.scss";
</style>
