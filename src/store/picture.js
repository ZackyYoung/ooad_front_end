import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import dataService from "@/service/dataService.js";

export const usePictureStore = defineStore('picture', ()=>{
    const userAvatar = ref(null)
    const tempAvatar = reactive([])
    async function updateAvatar(formData){
        return new Promise((resolve) => {
            dataService.updateAvatar(formData, resp => {
                resolve()
            })
        })
    }

    async function fetchAvatar(campusId) {
        return new Promise((resolve) => {
            dataService.fetchAvatar(campusId, resp =>{
                if(resp.data.code === 0)
                {
                    userAvatar.value = "data:image/png;base64," + resp.data.data
                }
                resolve()
            })
        })
    }

    async function fetchTempAvatar(campusId) {
        return new Promise((resolve) => {
            dataService.fetchAvatar(campusId, resp =>{
                if(resp.data.code === 0)
                {
                    tempAvatar.push({
                        campusId: campusId,
                        url: "data:image/png;base64," + resp.data.data
                    })
                }
                resolve()
            })
        })
    }
    return{
        userAvatar,
        tempAvatar,
        updateAvatar,
        fetchAvatar,
        fetchTempAvatar
    }
})
