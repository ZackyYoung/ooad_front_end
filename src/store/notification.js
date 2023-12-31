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

        socket.value.onmessage = (notification) =>{
            //TODO: handle received data
            let ntf = JSON.parse(notification.data)
            let name = '';
            switch (ntf.type)
            {
                case 'comment':
                    name = '评论消息'
                    break;
                case 'invitation':
                    name = '队伍消息'
                    break;
                case 'application':
                    name = '队伍消息'
                    break;
                case 'system':
                    name = '系统消息'
                    break;
                case 'roomExchange':
                    name = '换房消息'
                    break;
            }
            notificationData.push({
                notificationId: ntf.notificationId,
                type: ntf.type,
                name: name,
                time: ntf.time,
                read: ntf.read,
                text: (ntf.type === 'system')?ntf.content:JSON.parse(ntf.content)
            })
            console.log("notification received")
            notificationData.sort((a, b) => {
                if (a.unread !== b.unread) {
                    return a.unread ? -1 : 1;
                }
                return new Date(b.time) - new Date(a.time);
            })
        }

        socket.value.onclose = () =>{
            console.log("connection closed")
        }

        socket.value.onerror = (error) => {
            console.log(error)
        }
    }

    function notificationStoreClose()
    {
        socket.value.close()
        notificationData.length = 0
    }

    async function readNotification(notification)
    {
        return new Promise((resolve) =>{
            let index = notificationData.indexOf(notification)
            notificationData[index].read = true
            dataService.readNotification(notification.notificationId, resp =>{
                resolve()
            })
        })
    }

    async function deleteNotification(notification)
    {
        let index = notificationData.indexOf(notification)
        notificationData.splice(index, 1)
        return new Promise((resolve) =>{
            dataService.deleteNotification(notification.notificationId, resp=>{
                resolve()
            })
        })
    }

    async function deleteAllNotification(receiverId)
    {
        notificationData.splice(0)
        return new Promise((resolve) =>{
            dataService.deleteAllNotification(receiverId, resp=>{
                resolve()
            })
        })
    }

    return {
        notificationData,
        notificationWebsocketInit,
        notificationStoreClose,
        readNotification,
        deleteNotification,
        deleteAllNotification
    }
})
