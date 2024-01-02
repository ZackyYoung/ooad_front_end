import axios from 'axios'
import app from "../App.vue";

export const dataServerUrl = "http://10.26.80.100:8082";

// export const dataServerUrl = "http://10.32.60.95:8082"

const axiosInstance = axios.create({
    baseURL: dataServerUrl,
    withCredentials: true
});

function loginCheck(param, callback) {
    const url = `${dataServerUrl}/user/login`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function registerAccount(param, callback) {
    const url = `${dataServerUrl}/user/register`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function editPassword(param, callback) {
    const url = `${dataServerUrl}/user/updatePassword`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function updateStudent(param, callback) {
    const url = `${dataServerUrl}/student/update`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function fetchInformation(campusId, role, callback) {
    const url = `${dataServerUrl}/${role}/findById/${campusId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function findAllStudent(callback) {
    const url = `${dataServerUrl}/student/findAll`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteUser(delete_id, callback) {
    const url = `${dataServerUrl}/student/deleteById/${delete_id}`
    axiosInstance.delete(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function findAllTeam(callback) {
    const url = `${dataServerUrl}/team/findAll`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function findTeam(studentId, callback) {
    const url = `${dataServerUrl}/team/isInTeam/${studentId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function createTeam(param, callback) {
    const url = `${dataServerUrl}/team/addTeam`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteMember(studentId, callback) {
    const url = `${dataServerUrl}/team/deleteMember/${studentId}`
    axiosInstance.delete(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteTeam(creatorId, callback) {
    const url = `${dataServerUrl}/team/deleteByCreator/${creatorId}`
    axiosInstance.delete(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function alterLeader(param, callback) {
    const url = `${dataServerUrl}/team/alterLeader`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addMember(param, callback) {
    const url = `${dataServerUrl}/team/addMember`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addInvitation(param, callback) {
    const url = `${dataServerUrl}/invitation/addInvitation`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getStudentRelatedInvitation(studentId, callback) {
    const url = `${dataServerUrl}/invitation/findStudentRelated/${studentId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getTeamRelatedInvitation(teamId, callback) {
    const url = `${dataServerUrl}/invitation/findTeamRelated/${teamId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteInvitation(param, callback){
    const url = `${dataServerUrl}/invitation/deleteInvitation`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function rejectInvitation(param, callback){
    const url = `${dataServerUrl}/invitation/rejectInvitation`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function findAllRoom(callback) {
    const url = `${dataServerUrl}/room/findAll`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addRoom(param, callback) {
    const url = `${dataServerUrl}/room/addOne`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function editRoom(param, callback) {
    const url = `${dataServerUrl}/room/update`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function fetchRoomInfo(building, roomNumber, callback) {
    const url = `${dataServerUrl}/room/findOne/${building}/${roomNumber}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteRoom(building, roomNumber, callback) {
    const url = `${dataServerUrl}/room/delete/${building}/${roomNumber}`
    axiosInstance.delete(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function favoriteRoom(param, callback) {
    const url = `${dataServerUrl}/team/favoriteRoom`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function cancelFavorite(param, callback) {
    const url = `${dataServerUrl}/team/unfavoriteRoom`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function sendMessage(param, callback) {
    const url = `${dataServerUrl}/message/addOne`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function readMessage(messageId, callback) {
    const url = `${dataServerUrl}/message/read/${messageId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getCommentsByRoomId(roomId, callback) {
    const url = `${dataServerUrl}/comment/findCommentsByRoomId/${roomId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addComment(param, callback) {
    const url = `${dataServerUrl}/comment/addComment`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addReply(param, callback) {
    const url = `${dataServerUrl}/comment/addSecondComment`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function selectRoom(param, callback) {
    const url = `${dataServerUrl}/team/selectRoom`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getSelectedRoom(teamId, callback) {
    const url = `${dataServerUrl}/team/findSelectedRoom/${teamId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function unselectRoom(param, callback) {
    const url = `${dataServerUrl}/team/unselectRoom`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getPeriod(periodId, callback) {
    const url = `${dataServerUrl}/selectionPeriod/findById/${periodId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function updatePeriod(param, callback) {
    const url = `${dataServerUrl}/selectionPeriod/update`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function readNotification(notificationId, callback) {
    const url = `${dataServerUrl}/notification/read/${notificationId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function applySwap(applyCreatorId, applyReceiverId, callback) {
    const url = `${dataServerUrl}/team/applySwap?applyCreatorId=${applyCreatorId}&applyReceiverId=${applyReceiverId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function swapRoom(applyRoomId, acceptRoomId, callback) {
    const url = `${dataServerUrl}/team/swapRoom?applyRoomId=${applyRoomId}&acceptRoomId=${acceptRoomId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteNotification(notificationId, callback) {
    const url = `${dataServerUrl}/notification/deleteById/${notificationId}`
    axiosInstance.delete(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteAllNotification(receiverId, callback) {
    const url = `${dataServerUrl}/notification/deleteByReceiverId/${receiverId}`
    console.log(url)
    axiosInstance.delete(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function findOneRoom(roomId, callback) {
    const url = `${dataServerUrl}/room/findOne/${roomId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function updateAvatar(param, callback) {
    const url = `${dataServerUrl}/picture/upload`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function fetchAvatar(campusId, callback) {
    const url = `${dataServerUrl}/picture/download/${campusId}.png`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function sendCheckCode(mail, callback) {
    const url = `${dataServerUrl}/verification/getCode/${mail}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function verifyCheckCode(param, callback) {
    const url = `${dataServerUrl}/verification/verifyCode`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function directEditPassword(param, callback) {
    const url = `${dataServerUrl}/user/resetPassword`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteComment(commentId, callback){
    const url = `${dataServerUrl}/comment/delete/${commentId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteReply(replyId, callback){
    const url = `${dataServerUrl}/comment/deleteSecondComment/${replyId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
export default {
    loginCheck,
    registerAccount,
    editPassword,
    updateStudent,
    fetchInformation,
    findAllStudent,
    deleteUser,
    findAllTeam,
    findTeam,
    createTeam,
    deleteMember,
    deleteTeam,
    alterLeader,
    addMember,
    addInvitation,
    getTeamRelatedInvitation,
    getStudentRelatedInvitation,
    deleteInvitation,
    rejectInvitation,
    findAllRoom,
    addRoom,
    editRoom,
    fetchRoomInfo,
    deleteRoom,
    favoriteRoom,
    cancelFavorite,
    sendMessage,
    readMessage,
    getCommentsByRoomId,
    addComment,
    addReply,
    selectRoom,
    getSelectedRoom,
    unselectRoom,
    getPeriod,
    updatePeriod,
    readNotification,
    applySwap,
    swapRoom,
    deleteNotification,
    deleteAllNotification,
    findOneRoom,
    updateAvatar,
    fetchAvatar,
    sendCheckCode,
    verifyCheckCode,
    directEditPassword,
    deleteComment,
    deleteReply
}
