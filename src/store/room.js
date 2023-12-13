import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive} from "vue";


export const useRoomStore = defineStore('room', () => {
    const roomData = reactive([])

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
        })
    }

    return{
        roomData,
        findAllRoom
    }
})
