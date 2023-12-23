import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import dataService from "@/service/dataService.js";


export const usePeriodStore = defineStore("period", () =>{
    const periodData = reactive({
        startTime: '',
        endTime: ''
    })
    const msg = ref('')
    async function getPeriod(degree, gender){
        let periodId = 0;
        if(gender === '男')
        {
            if(degree === '硕士生')
                periodId = 1;
            if(degree === '博士生')
                periodId = 2;
        }
        if(gender === '女')
        {
            if(degree === '博士生')
                periodId = 3;
            if(degree === '硕士生')
                periodId = 4;
        }
        return new Promise((resolve) =>{
            dataService.getPeriod(periodId, resp=>{
                periodData.startTime = resp.data.data.startTime
                periodData.endTime = resp.data.data.endTime
                resolve()
            })

        })

    }

    async function updatePeriod(degree, gender, newTime){
        let periodId = 0;
        if(gender === '男')
        {
            if(degree === '硕士生')
                periodId = 1;
            if(degree === '博士生')
                periodId = 2;
        }
        if(gender === '女')
        {
            if(degree === '博士生')
                periodId = 3;
            if(degree === '硕士生')
                periodId = 4;
        }
        return new Promise((resolve) =>{
            dataService.updatePeriod({
                periodId: periodId,
                startTime: newTime.value[0],
                endTime: newTime.value[1]
            }, resp=>{
                msg.value = resp.data.msg
                periodData.startTime = resp.data.data.startTime
                periodData.endTime = resp.data.data.endTime
                resolve()
            })

        })
    }
    return{
        periodData,
        msg,
        getPeriod,
        updatePeriod
    }
})
