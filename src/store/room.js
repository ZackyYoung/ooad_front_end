import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {usePictureStore} from "@/store/picture.js";


export const useRoomStore = defineStore('room', () => {
    const pictureStore = usePictureStore()
    const roomData = reactive([])
    const roomToView = reactive({
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
    const msg = ref("")
    const comments = reactive([])
    async function findAllRoom(){
        roomData.length = 0
        return new Promise((resolve) => {
            dataService.findAllRoom(resp => {
                resp.data.data.forEach(room => {
                    roomData.push({
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
                resolve()
            })

        })
    }

    async function findAllRoomByGender(gender) {
        roomData.length = 0
        return new Promise((resolve) => {
            dataService.findAllRoom(resp => {
                resp.data.data.forEach(room => {
                    if(room.gender === gender) {
                        roomData.push({
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
                    }
                })

                resolve()
            })
        })

    }
    async function addRoom(form){
        return new Promise((resolve) => {
            dataService.addRoom({
                buildingId: form.building,
                roomNumber: form.roomNumber,
                floor: form.floor,
                roomType: form.roomType,
                gender: form.gender,
                description: form.description
            },resp => {
                if(resp.data.code === 0)
                {
                    msg.value = '新增房间成功！'

                }
                else
                {
                    switch (resp.data.code)
                    {
                        case 400:
                            msg.value = '房间已存在'
                            break
                    }
                }
                resolve()
            })
        })
    }

    async function editRoom(form){
        return new Promise((resolve) => {
            dataService.editRoom({
                buildingId: form.building,
                roomNumber: form.roomNumber,
                floor: form.floor,
                roomType: form.roomType,
                gender: form.gender,
                description: form.description
            },resp => {
                if(resp.data.code === 0)
                {
                    msg.value = '编辑房间信息成功！'
                }
                else
                {
                    switch (resp.data.code)
                    {
                        case 404:
                            msg.value = '房间不存在'
                            break
                    }
                }
                resolve()
            })
        })
    }


    async function deleteRoom(){
        return new Promise((resolve) => {
            dataService.deleteRoom(roomToView.building, roomToView.roomNumber, resp => {
                if(resp.data.code === 0)
                    msg.value = '删除房间成功！'
                resolve()
            })

        })
    }

    async function favoriteRoom(studentId, building, roomNumber) {
        return new Promise((resolve) => {
            dataService.favoriteRoom({
                studentId: studentId,
                buildingId: building,
                roomNumber: roomNumber
            }, resp => {
                resolve()
            })
        })
    }

    async function cancelFavorite(studentId, building, roomNumber) {
        return new Promise((resolve) => {
            dataService.cancelFavorite({
                studentId: studentId,
                buildingId: building,
                roomNumber: roomNumber
            }, resp => {
                resolve()
            })
        })
    }
    async function getComments() {
        comments.length = 0
        return new Promise((resolve) => {
            dataService.getCommentsByRoomId(roomToView.roomId, async resp => {
                for (const comment of resp.data.data) {
                    let secondComments = []
                    for (const secondComment of comment.secondComments) {
                        await pictureStore.fetchTempAvatar(secondComment.author)
                        let avatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === secondComment.author)
                        if(avatar)
                            avatar = avatar.url
                        secondComments.push({
                            secondCommentId: secondComment.secondCommentId,
                            parentComment: secondComment.parentComment,
                            author: secondComment.author,
                            authorName: secondComment.authorName,
                            content: secondComment.content,
                            time: secondComment.time,
                            avatar: avatar
                        })
                    }
                    await pictureStore.fetchTempAvatar(comment.author)
                    let avatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === comment.author)
                    if(avatar)
                        avatar = avatar.url
                    comments.push({
                        commentId: comment.commentId,
                        authorId: comment.author,
                        author: comment.authorName,
                        content: comment.content,
                        time: comment.time,
                        replies: secondComments,
                        showReplies: false,
                        avatar: avatar
                    })
                }
                resolve()
            })

        })
    }

    async function addComment(form) {
        return new Promise((resolve) => {
            dataService.addComment(form, resp =>{
                resolve()
            })
        })
    }

    async function addReply(form) {
        return new Promise((resolve) => {
            dataService.addReply(form, resp => {
                resolve()
            })

        })
    }

    async function findRoomToView(roomId) {
        window.sessionStorage.setItem("roomId", roomId)
        return new Promise((resolve) => {
            dataService.findOneRoom(roomId, resp => {
                let room = resp.data.data
                roomToView.roomId = room.roomId
                roomToView.district = room.building.zone
                roomToView.building = room.building.buildingId
                roomToView.roomNumber = room.roomNumber
                roomToView.roomType = room.roomType
                roomToView.floor = room.floor
                roomToView.gender = room.gender
                roomToView.description = room.description
                roomToView.selectedTeamCreatorId = room.selectedTeamCreatorId
                resolve()
            })
        })
    }

    async function deleteComment(commentId)
    {
        return new Promise((resolve) => {
            dataService.deleteComment(commentId, resp=>{
                if(resp.data.code === 0)
                {
                    msg.value = '删除评论成功！'
                }
                else
                {
                    msg.value = resp.data.msg
                }
                resolve()
            })
        })
    }

    async function deleteReply(replyId)
    {
        return new Promise((resolve) => {
            dataService.deleteReply(replyId, resp => {
                if(resp.data.code === 0)
                {
                    msg.value = '删除回复成功'
                }
                else
                {
                    msg.value = resp.data.msg
                }
                resolve()
            })
        })
    }
    return{
        msg,
        roomData,
        roomToView,
        comments,
        findAllRoom,
        findAllRoomByGender,
        addRoom,
        editRoom,
        deleteRoom,
        favoriteRoom,
        cancelFavorite,
        getComments,
        addComment,
        addReply,
        findRoomToView,
        deleteComment,
        deleteReply
    }
})
