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
        <div class="creator-name">
          <va-chip class="mr-3">
            队长
          </va-chip>
          {{ props.teamInfo.creatorName }}
        </div>
        <div class="member-name">
          <va-chip outline class="mr-3">
            队员
          </va-chip>
          <span v-for="(member,index) in props.teamInfo.teamMembers">
            <span v-if="index > 0">
              ，
            </span>
            {{ member }}
          </span>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<style scoped>
.creator-name {
  margin: 0.5rem;
  padding: 0.2rem;
}

.member-name {
  margin: 0.5rem;
  padding: 0.2rem;
}
</style>
