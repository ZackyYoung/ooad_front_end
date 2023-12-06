import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useStudentStore = defineStore('student', () =>{
    const studentData = reactive([])

async function findAllStudent(gender, isTeacher){
    studentData.length = 0
    return new Promise((resolve, reject) => {
        dataService.findAllStudent(resp => {
            if (resp.status === 200) {
                resp.data.data.forEach((student) =>{
                    if(student.gender === gender || isTeacher)
                        studentData.push(student)
                })
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
