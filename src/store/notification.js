import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";


export const useNotificationStore = defineStore("notification", () =>{
    const notificationData = reactive([])
    const serverUrl = 'ws://10.26.80.100:8082/api/websocket/notification/'
    const socket = ref(null)
    function notificationWebsocketInit(campusId){
        socket.value = new WebSocket(`${serverUrl}${campusId}`)
        console.log('websocket连接状态:' + socket.value.readyState)
        socket.value.onopen = () =>{
            console.log("connection established")
        }

        socket.value.onmessage = (message) =>{
            //TODO: handle received data
            console.log("notification received")
            console.log(message)
        }

        socket.value.onclose = () =>{
            console.log("connection closed")
        }

        socket.value.onerror = (error) => {
            console.log(error)
        }
    }

    function notificationWebsocketClose(){
        if(socket.value)
            socket.value.close()

    }

    return {
        notificationData,
        notificationWebsocketInit,
        notificationWebsocketClose
    }
})
