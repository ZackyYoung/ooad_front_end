import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import dataService from "@/service/dataService.js";


export const useTeamStore = defineStore('team', () => {
    const teamData = reactive([])
    const current_team = ref({})
    const joined = ref(false)
    const msg = ref(null)
    const createTeamForm = reactive({
        teamName: '',
        creatorId: '',
        gender: ''
    })
    async function findAllTeam(gender){
        teamData.length = 0
        return new Promise((resolve, reject) => {
            dataService.findAllTeam(resp => {
                if (resp.status === 200) {
                    resp.data.data.forEach((team)=>{
                        if(team.gender === gender) {
                            let teamMemberNames = []
                            let creatorName
                            team.teamMembers.forEach((member) => {
                                if (member.studentId === team.creatorId)
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
                        }
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

    async function createTeam() {
        return new Promise((resolve, reject) => {
            console.log(joined)
            if(joined.value === true){
                msg.value = "You have already created or joined a team"
                resolve()
            }
            else {
                dataService.createTeam(createTeamForm, resp => {
                    if (resp.data.code === 0) {
                        joined.value = true
                        msg.value = resp.data.msg
                        resolve()
                    } else {
                        msg.value = resp.data.msg
                        resolve()
                    }
                })
            }
        })
    }

    async function removeMember(studentId) {
        return new Promise((resolve, reject) => {
            dataService.deleteMember(studentId, resp =>{
                if (resp.data.code === 0)
                {
                    msg.value = resp.data.msg
                    resolve()
                }
                else{
                    msg.value = resp.data.msg
                    resolve()
                }
            })
        })
    }

    async function deleteTeam(creatorId){
        return new Promise((resolve, reject) => {
            dataService.deleteTeam(creatorId, resp =>{
                if (resp.data.code === 0)
                {
                    msg.value = resp.data.msg
                    resolve()
                }
                else{
                    msg.value = resp.data.msg
                    resolve()
                }
            })
        })
    }
    async function alterLeader(creatorId, leaderId) {
        return new Promise((resolve, reject) => {
            dataService.alterLeader({
                oldId: creatorId,
                leaderId: leaderId
            }, resp => {
                if (resp.data.code === 0)
                {
                    msg.value = resp.data.msg
                    resolve()
                }
                else{
                    msg.value = resp.data.msg
                    resolve()
                }
            })
        })
    }

    async function applyToJoinTeam(creatorId, applierId){
        return new Promise((resolve, reject) => {
            dataService.addInvitation({
                creatorId: creatorId,
                studentId: applierId,
                invitation: false
            }, resp => {
                if (resp.data.code === 0)
                {
                    msg.value = resp.data.msg
                    resolve()
                }
                else{
                    msg.value = resp.data.msg
                    resolve()
                }
            })
        })
    }

    async function addMember(creatorId, studentId){
        return new Promise((resolve, reject) => {
            dataService.addMember({
                creatorId: creatorId,
                studentId: studentId,
            }, resp => {
                    msg.value = resp.data.msg
                    resolve()
            })
        })
    }


    return {
        teamData,
        findAllTeam,
        current_team,
        createTeamForm,
        joined,
        msg,
        fetchTeamInformation,
        createTeam,
        removeMember,
        deleteTeam,
        alterLeader,
        applyToJoinTeam,
        addMember
    }
})
