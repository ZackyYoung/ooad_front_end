<script setup lang="ts">
import {TeamInfoType} from "@/utils/types/type";
import {onMounted, reactive, toRef} from "vue";
import StudentInfo from "@/components/student/center/StudentInfo.vue";
import {useTeamStore} from "@/store/team.js";
import {useAccountStore} from "@/store/account";

const accountStore = useAccountStore()
const teamStore = useTeamStore();
onMounted(()=>{
  teamStore.fetchTeamInformation(accountStore.accountCampusId)
})


</script>

<template>
  <div class="team-info-container flex flex-col items-baseline gap-6" v-if="teamStore.joined" v-for="member in teamStore.current_team.teamMembers">
    <StudentInfo
        :student-info="member"
    />
  </div>
  <div v-if="!teamStore.joined">
    <h1>你还没有加入队伍，快去广场加入或创建队伍吧~~</h1>
  </div>
</template>

<style scoped>
.team-info-container {

}
</style>
