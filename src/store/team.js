import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import dataService from "@/service/dataService.js";


export const useTeamStore = defineStore('team', () => {
    const teamData = reactive([])
    const roomSelected = ref(false)
    const selectedRoom = reactive({
        roomId: '',
        district: '',
        building: '',
        roomNumber: '',
        floor: '',
        roomType: '',
        gender: '',
        description: '',
        selectedTeamCreatorId: ''
    })
    const current_team = reactive({
        teamId: '',
        teamName: '',
        creatorId: '',
        teamMembers: [],
        favoriteRooms: []
    })
    const joined = ref(false)
    const msg = ref(null)
    const createTeamForm = reactive({
        teamName: '',
        creatorId: '',
        gender: ''
    })
    const hasFavoriteRoom = computed(()=>{
        return current_team.favoriteRooms.length !== 0
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
            dataService.findTeam(studentId, async resp => {
                if (resp.status === 200) {
                    if (resp.data.code === 0) {
                        joined.value = true
                        let tempRooms = reactive([])
                        resp.data.data.favoriteRooms.forEach((room) => {
                            tempRooms.push({
                                roomId: room.roomId,
                                district: room.building.zone,
                                building: room.building.buildingId,
                                roomNumber: room.roomNumber,
                                floor: room.floor,
                                roomType: room.roomType,
                                gender: room.gender,
                                description: room.description,
                                selectedTeamCreatorId: room.selectedTeamCreatorId
                            })
                        })
                        current_team.teamId = resp.data.data.teamId
                        current_team.teamName = resp.data.data.teamName
                        current_team.creatorId = resp.data.data.creatorId
                        current_team.teamMembers = resp.data.data.teamMembers
                        current_team.favoriteRooms = tempRooms
                    } else {
                        joined.value = false
                    }
                    await getSelectedRoom()
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

    async function inviteToJoinTeam(creatorId, studentId){
        return new Promise((resolve, reject) => {
            dataService.addInvitation({
                creatorId: creatorId,
                studentId: studentId,
                invitation: true
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

    async function selectRoom(roomId, teamId){
        return new Promise((resolve) => {
            dataService.selectRoom({
                roomId: roomId,
                teamId: teamId
            }, resp => {
                msg.value = resp.data.msg

            })
            resolve()
        })
    }

async function getSelectedRoom()
{
    return new Promise((resolve) =>{
        dataService.getSelectedRoom(current_team.teamId, resp => {
            if(resp.data.code === 0)
            {
                let room = resp.data.data
                selectedRoom.roomId = room.roomId
                selectedRoom.district = room.building.zone
                selectedRoom.building = room.building.buildingId
                selectedRoom.roomNumber = room.roomNumber
                selectedRoom.floor = room.floor
                selectedRoom.roomType = room.roomType
                selectedRoom.gender = room.gender
                selectedRoom.description = room.description
                selectedRoom.selectedTeamCreatorId = room.selectedTeamCreatorId
                roomSelected.value = true
            }
            else
            {
                selectedRoom.roomId = ''
                selectedRoom.district = ''
                selectedRoom.building = ''
                selectedRoom.roomNumber = ''
                selectedRoom.floor = ''
                selectedRoom.roomType = ''
                selectedRoom.gender = ''
                selectedRoom.description = ''
                selectedRoom.selectedTeamCreatorId = ''
                roomSelected.value = false
            }
        })
        resolve()
    })
}

async function unselectRoom(roomId, teamId)
{
    return new Promise((resolve) => {
        dataService.unselectRoom({
            roomId: roomId,
            teamId: teamId
        }, resp => {
            msg.value = resp.data.msg
        })
        resolve()
    })
}


    return {
        teamData,
        selectedRoom,
        roomSelected,
        findAllTeam,
        current_team,
        createTeamForm,
        joined,
        msg,
        hasFavoriteRoom,
        fetchTeamInformation,
        createTeam,
        removeMember,
        deleteTeam,
        alterLeader,
        applyToJoinTeam,
        addMember,
        inviteToJoinTeam,
        selectRoom,
        getSelectedRoom,
        unselectRoom
    }
})
