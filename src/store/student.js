import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useStudentStore = defineStore('student', () =>{
    const studentData = ref([])

async function findAllStudent(){
    return new Promise((resolve, reject) => {
        dataService.findAllStudent(resp => {
            if (resp.status === 200) {
                studentData.value = resp.data.data
                resolve()
            } else {
                reject()
            }
        })
    })
}
    return {
        studentData,
        findAllStudent
    }
})
