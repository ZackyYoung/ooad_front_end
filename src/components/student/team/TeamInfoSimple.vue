<script setup>
import {useTeamStore} from "@/store/team.js";

const teamStore = useTeamStore();

const props = defineProps(['teamInfo'])
</script>

<template>
  <div class="info-container">
    <va-card class="info-card">
      <va-card-title class="info-card__title">{{ props.teamInfo.teamName }}的队伍介绍</va-card-title>
      <va-card-content class="info-card__content">
        <div class="info-card__content__sid">
          创建者：{{ props.teamInfo.creatorName }}
        </div>
        <div class="info-card__content__gender">
          队员：{{ props.teamInfo.teamMembers }}
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<style scoped>

</style>
