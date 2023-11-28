<script setup lang="ts">
import {TeamInfoType} from "@/utils/types/type";
import {reactive, toRef} from "vue";
import StudentInfo from "@/components/student/StudentInfo.vue";
import {useTeamStore} from "@/store/team.js";

const teamStore = useTeamStore();

const members = toRef(teamStore.teamMembers);
</script>

<template>
  <div class="team-info-container flex flex-col items-baseline gap-6" v-for="member in members.value">
    <StudentInfo
        :student-id="member.sid"
        :name="member.name"
        :degree="member.degree"
        :gender="member.gender"
        :major="member.major"
        :info="member.intro"
    />
  </div>
</template>

<style scoped>
.team-info-container {

}
</style>