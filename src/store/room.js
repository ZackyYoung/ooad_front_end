import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";


export const useRoomStore = defineStore('room', () => {
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
        teamName: '',
    })
    const msg = ref("")
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
                        description: room.description
                    })
                })
            })
            resolve()
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
                            description: room.description
                        })
                    }
                })
            })
            resolve()
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
                msg.value = resp.data.msg
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
                msg.value = resp.data.msg
                resolve()
            })
        })
    }

    async function updateRoomToView() {
        return new Promise((resolve) => {
            dataService.fetchRoomInfo(roomToView.building, roomToView.roomNumber, resp =>{
                roomToView.district = resp.data.data.building.zone
                roomToView.floor = resp.data.data.floor
                roomToView.roomType = resp.data.data.roomType
                roomToView.gender = resp.data.data.gender
                roomToView.description = resp.data.data.description
            })
            resolve()
        })
    }

    async function deleteRoom(){
        return new Promise((resolve) => {
            dataService.deleteRoom(roomToView.building, roomToView.roomNumber, resp => {
                msg.value = resp.data.msg
            })
            resolve()
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
    return{
        msg,
        roomData,
        roomToView,
        findAllRoom,
        findAllRoomByGender,
        addRoom,
        editRoom,
        updateRoomToView,
        deleteRoom,
        favoriteRoom,
        cancelFavorite
    }
})
