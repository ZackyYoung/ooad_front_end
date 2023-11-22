<script setup lang="ts">

import StudentHeader from "@/components/student/StudentHeader.vue";
import TeamInfo from "@/components/student/TeamInfo.vue";
import SideBar from "@/components/SideBar.vue";
import StudentEditPasswd from "@/components/student/center/StudentEditPasswd.vue";
import {ref} from "vue";
import MemberManage from "@/components/student/team/MemberManage.vue";
import {useTeamStore} from "@/store/team";
import {storeToRefs} from "pinia";


const team_sidebar_items = [
  {title: "队伍资料", icon: "group"},
  {title: "成员管理", icon: "group_add"},
  {title: "队伍收藏", icon: "bookmark"},
];

const centerActiveOption = ref(team_sidebar_items[0].title);

const teamStore = useTeamStore();
const {user_has_team} = storeToRefs(teamStore);

function updateOption(option: string) {
  centerActiveOption.value = option;
}
</script>

<template>
  <div class="team-wrapper">
    <StudentHeader class="header"/>
    <div class="team-container">
      <SideBar :sidebar-items="team_sidebar_items" @updateOption="updateOption" class="sidebar"/>
      <div class="team-content" v-if="user_has_team">
        <TeamInfo v-if="centerActiveOption==='队伍资料'"/>
        <MemberManage v-if="centerActiveOption==='成员管理'"/>
      </div>
      <div class="no-team" v-else>
        <div class="no-team-container">
          <va-card style="padding: 5rem">
            <p
                style="font-size: 2rem; margin: 1rem"
            >
              您还没有任何队伍
            </p>
            <div>
              <va-button
                  class="mr-3 mb-3"
                  @click="teamStore.createTeam"
              >
                创建队伍
                <va-icon class="ml-1" name="add_circle"/>
              </va-button>
              <va-button
                  class="mr-3 mb-3"
                  @click=""
              >
                寻找队友
                <va-icon class="ml-1" name="person_search"/>
              </va-button>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    height: 100%;
  }


  .team-container {
    display: flex;
    height: 100%;

    .sidebar {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      height: 100%;
    }

    .team-content {
      float: right;
      flex-grow: 1;
      flex-shrink: 1;
      height: 100%;
    }

    .no-team {
      float: right;
      flex-grow: 1;
      flex-shrink: 1;

      .no-team-container {
        padding: 0.5rem 1rem;
        text-align: center;
      }
    }
  }


}
</style>