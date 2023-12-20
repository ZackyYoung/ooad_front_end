import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";


export const useNotificationStore = defineStore("notification", () =>{
    const notificationData = reactive([])
    const serverUrl = '127.0.0.1:1234'
    const socket = ref(null)
    function notificationWebsocketInit(campusId){
        socket.value = new WebSocket(`ws://${serverUrl}`)
        console.log('websocket连接状态:' + socket.readyState)
        socket.onopen = () =>{
            socket.value.send("connection established")
            socket.value.send(`campusId: ${campusId}`)
            console.log("connection established")
        }

        socket.onmessage = (message) =>{
            //TODO: handle received data
            socket.value.send("message received")
            console.log("message received")
            console.log(message)
        }

        socket.onclose = () =>{
            socket.value.send("connection closed")
            console.log("connection closed")
        }

        socket.onerror = (error) => {
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
