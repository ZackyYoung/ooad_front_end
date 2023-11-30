import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import dataService from "@/service/dataService.js";


export const useTeamStore = defineStore('team', () => {
    const teamData = reactive([])
    const current_team = ref({})
    const joined = ref(false)
    async function findAllTeam(){
        teamData.length = 0
        return new Promise((resolve, reject) => {
            dataService.findAllTeam(resp => {
                if (resp.status === 200) {
                    resp.data.data.forEach((team)=>{
                        let teamMemberNames = []
                        let creatorName
                        team.teamMembers.forEach((member)=>{
                            if(member.studentId === team.creatorId)
                                creatorName = member.name
                            else
                                teamMemberNames.push(member.name)
                        })
                        teamData.push({
                            teamId: team.teamId,
                            teamName: team.teamName,
                            creatorId: team.creatorId,
                            creatorName: creatorName,
                            teamMembers: teamMemberNames
                        })
                    })
                    resolve()
                } else {
                    reject()
                }
            })
        })
    }

    async function fetchTeamInformation(studentId) {
        return new Promise((resolve, reject) => {
            dataService.findTeam(studentId, resp => {
                if (resp.status === 200) {
                    if(resp.data.code === 0) {
                        joined.value = true
                        current_team.value = {
                            teamId: resp.data.data.teamId,
                            teamName: resp.data.data.teamName,
                            creatorId: resp.data.data.creatorId,
                            teamMembers: resp.data.data.teamMembers
                        }
                    }
                    else{
                        joined.value = false
                    }
                    resolve()
                } else {
                    reject()
                }
            })
        })
    }

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
        teamData,
        findAllTeam,
        current_team,
        joined,
        fetchTeamInformation,
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
