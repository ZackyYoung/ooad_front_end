<script setup lang="ts">
import {TeamInfo} from "@/utils/types/type";
import {reactive} from "vue";
import StudentInfo from "@/components/student/StudentInfo.vue";

const props = defineProps<{
  teamInfo: TeamInfo
}>()

const teamInfo = reactive(props.teamInfo)
</script>

<template>
  <div class="team-info-container flex flex-col items-baseline gap-6" v-for="member in teamInfo.members">
    <StudentInfo :student-info="member"/>
  </div>
</template>

<style scoped>
.team-info-container {

}
</style>