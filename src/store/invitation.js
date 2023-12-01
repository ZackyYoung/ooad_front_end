import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useInvitationStore = defineStore('invitation', () =>{
    const invitationData = reactive([])

    async function getStudentRelatedInvitation(studentId){
        invitationData.length = 0
        return new Promise((resolve, reject) => {
            dataService.getStudentRelatedInvitation(studentId, resp =>{
                if(resp.data.code === 0)
                {
                    let creatorName
                    resp.data.data.forEach((invitation) =>{
                        let team = invitation.team
                        let teamMemberNames = []
                        team.teamMembers.forEach((member) => {
                            if (member.studentId === team.creatorId)
                                creatorName = member.name
                            else
                                teamMemberNames.push(member.name)
                        })
                        invitationData.push({
                            teamName: invitation.team.teamName,
                            creatorId: invitation.team.creatorId,
                            creatorName: creatorName,
                            teamMemberNames: teamMemberNames,
                            is_invitation: invitation.invitation
                        })
                    })
                }
                resolve()
            })
        })
    }

    async function getTeamRelatedInvitation(teamId) {
        invitationData.length = 0
        return new Promise((resolve, reject) => {
            dataService.getTeamRelatedInvitation(teamId, resp =>{
                if(resp.data.code === 0)
                {
                    resp.data.data.forEach((application) =>{
                        invitationData.push({
                            name: application.student.name,
                            studentId: application.student.studentId,
                            is_invitation: application.invitation
                        })
                    })
                }
                resolve()
            })
        })
    }

    async function deleteInvitation(teamId, studentId, invitation){
        return new Promise((resolve, reject) => {
            dataService.deleteInvitation({
                teamId: teamId,
                studentId: studentId,
                invitation: invitation
            }, resp =>{
                resolve()
            })
        })
    }

    async function deleteStudentRelatedInvitation(studentId){
        await getStudentRelatedInvitation(studentId)
        return new Promise((resolve, reject) => {
            invitationData.forEach((invitation) => {
                dataService.deleteInvitation({
                    teamId: invitation.team.teamId,
                    studentId: invitation.studentId.studentId,
                    invitation: invitation.invitation
                })
            })
            resolve()
        })
    }
    return{
        invitationData,
        getTeamRelatedInvitation,
        getStudentRelatedInvitation,
        deleteInvitation,
        deleteStudentRelatedInvitation
    }
})
