import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";

export const useTeamStore = defineStore('team', () => {
    const team_id = ref(0)
    const creator_id = ref(0)
    const teamMembers = reactive({})
    const cur_user_id = ref(0)
    const user_has_team = ref(true)

    function getInfo() {
        team_id.value = 1;
        creator_id.value = 12110001;
        cur_user_id.value = 12110001;
        teamMembers.value = [
            {
                sid: 12110000,
                name: '苏苏',
                gender: 2,
                degree: 2021,
                major: '计算机科学与工程系',
                intro: '大家好'
            },
            {
                sid: 12110001,
                name: '南小科',
                gender: 1,
                degree: 2022,
                major: '电子系',
                intro: '大家坏'
            },
            {
                sid: 12110002,
                name: '玉群',
                gender: 1,
                degree: 2020,
                major: '软件工程',
                intro: '不想写ooad'
            },
            {
                sid: 12110003,
                name: '坤坤',
                gender: 1,
                degree: 2022,
                major: '物理系',
                intro: '开学了啊啊啊啊啊啊啊啊'
            },
        ]
    }

    getInfo();

    const is_creator = computed(() => creator_id.value === cur_user_id.value)

    function transOwner(sid) {
        creator_id.value = sid;
    }

    function createTeam() {

        if (user_has_team.value === false) {
            //


            //
            teamMembers.value = [{
                sid: 12110001,
                name: '南小科',
                gender: 1,
                degree: 2022,
                major: '电子系',
                intro: '大家坏'
            }]
            creator_id.value = cur_user_id.value;
            user_has_team.value = true
        }
    }

    function removeMember(sid) {
        teamMembers.value = teamMembers.value.filter(member => member.sid !== sid);

        //


        //
    }

    function exitTeam() {
        removeMember(cur_user_id);

        //

        //

        user_has_team.value = false;
    }


    return {
        user_has_team,
        creator_id,
        cur_user_id,
        teamMembers,
        is_creator,
        transOwner,
        createTeam,
        exitTeam,
        removeMember
    }
})
