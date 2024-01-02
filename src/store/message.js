import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import dataService from "@/service/dataService.js";
import {usePictureStore} from "@/store/picture.js";


export const useMessageStore = defineStore("message", () => {
    const pictureStore = usePictureStore()
    const chatData = reactive([])
    const serverUrl = 'ws://10.26.80.100:8082/api/websocket/message/'
    // const serverUrl = 'ws://10.32.60.95:8082/api/websocket/message/'
    const socket = ref(null)
    const queue = ref([])
    function messageWebsocketInit(campusId){
        socket.value = new WebSocket(`${serverUrl}${campusId}`)
        console.log('websocket连接状态:' + socket.value.readyState)

        socket.value.onopen = () =>{
            console.log("connection established")
        }
        socket.value.onmessage = async (message) => {
            let msg = JSON.parse(message.data)
            queue.value.push(msg)
            if(queue.value.length === 1)
            {
                await processQueue(campusId)
            }

        }

        socket.value.onclose = () =>{
            console.log("connection closed")
        }

        socket.value.onerror = (error) => {
            console.log(error)
        }
    }

    async function processQueue(campusId) {
        if (queue.value.length === 0) {
            // 队列为空，不执行任何操作
            return;
        }
        const msg = queue.value[0];
        let flag = false
        chatData.forEach((chat) => {
            if (chat.slaveId === msg.senderId || (chat.masterId === msg.senderId && chat.slaveId === msg.receiverId)) {
                chat.messages.push(msg)
                flag = true
            }
        })
        if (!flag) {
            await pictureStore.fetchTempAvatar(msg.receiverId)
            let receiverAvatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === msg.receiverId)
            if (receiverAvatar)
                receiverAvatar = receiverAvatar.url
            await pictureStore.fetchTempAvatar(msg.senderId)
            let senderAvatar = pictureStore.tempAvatar.find(avatar => avatar.campusId === msg.senderId)
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
        // 任务完成后，从队列中移除已处理的任务
        queue.value.shift();

        // 继续处理下一个任务
        await processQueue(campusId);
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

    function hasUnreadMessage(campusId){
        // const chatArray = chatData.filter((_, index) => index > 0);
        for (const chat of chatData) {
            // 在每个chat的messages数组中查找符合条件的message
            const hasUnreadMessage = chat.messages.some(message => (message.receiverId === campusId && message.read===false));

            if (hasUnreadMessage) {
                return true;
            }
        }

        return false;
    }

    return {
        chatData,
        messageWebsocketInit,
        messageStoreClose,
        sendMessage,
        readMessage,
        hasUnreadMessage
    }
})
