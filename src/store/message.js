import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import dataService from "@/service/dataService.js";
import {usePictureStore} from "@/store/picture.js";


export const useMessageStore = defineStore("message", () => {
    const pictureStore = usePictureStore()
    const chatData = reactive([])
    const serverUrl = 'ws://10.26.80.100:8082/api/websocket/message/'
    const socket = ref(null)

    function messageWebsocketInit(campusId){
        socket.value = new WebSocket(`${serverUrl}${campusId}`)
        console.log('websocket连接状态:' + socket.value.readyState)

        socket.value.onopen = () =>{
            console.log("connection established")
        }
        socket.value.onmessage = async (message) => {
            //TODO: handle received data
            let msg = JSON.parse(message.data)
            let flag = false
            console.log(msg)
            console.log(chatData.length)
            chatData.forEach((chat) => {
                if (chat.slaveId === msg.senderId || (chat.masterId === msg.senderId && chat.slaveId === msg.receiverId)) {
                    chat.messages.push(msg)
                    flag = true
                }
            })
            if (!flag) {
                let receiverAvatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === msg.receiverId)
                if (!receiverAvatar) {
                    await pictureStore.fetchTempAvatar(msg.receiverId)
                    receiverAvatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === msg.receiverId)
                }
                if (receiverAvatar)
                    receiverAvatar = receiverAvatar.url
                let senderAvatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === msg.senderId)
                if (!senderAvatar) {
                    await pictureStore.fetchTempAvatar(msg.senderId)
                    senderAvatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === msg.senderId)
                }
                if (senderAvatar)
                    senderAvatar = senderAvatar.url
                if (campusId === msg.receiverId) {
                    chatData.push({
                        messageId: msg.messageId,
                        slaveId: msg.senderId,
                        slaveName: msg.senderName,
                        slaveAvatar: senderAvatar,
                        masterId: msg.receiverId,
                        masterAvatar: receiverAvatar,
                        messages: [msg]
                    })
                } else {
                    chatData.push({
                        messageId: msg.messageId,
                        slaveId: msg.receiverId,
                        slaveName: msg.receiverName,
                        slaveAvatar: receiverAvatar,
                        masterId: msg.senderId,
                        masterAvatar: senderAvatar,
                        messages: [msg]
                    })
                }

            }
            // console.log(msg)
            // console.log("message received")
        }

        socket.value.onclose = () =>{
            console.log("connection closed")
        }

        socket.value.onerror = (error) => {
            console.log(error)
        }
    }

    function messageStoreClose(){
        socket.value.close()
        chatData.length = 0
    }

    async function sendMessage(message){
        return new Promise((resolve) =>{
            dataService.sendMessage(message, resp=>{
                resolve()
            })
        })
    }

    async function readMessage(chat) {
        return new Promise((resolve) =>{
            let index = chatData.indexOf(chat)
            chatData[index].messages.forEach((message)=>{
                message.read = true
                dataService.readMessage(message.messageId, resp =>{
                    resolve()
                })
            })

        })
    }

    return {
        chatData,
        messageWebsocketInit,
        messageStoreClose,
        sendMessage,
        readMessage
    }
})
