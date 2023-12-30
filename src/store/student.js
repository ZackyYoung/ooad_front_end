import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {usePictureStore} from "@/store/picture.js";

export const useStudentStore = defineStore('student', () =>{
    const pictureStore = usePictureStore()
    const studentData = reactive([])

async function findAllStudent(gender, degree, isTeacher){
    studentData.length = 0
    return new Promise((resolve, reject) => {
        dataService.findAllStudent(async resp => {
            if (resp.status === 200) {
                for (const student of resp.data.data) {
                    if ((student.gender === gender && student.degree === degree) || isTeacher)
                    {
                        await pictureStore.fetchTempAvatar(student.studentId)
                        let avatar = pictureStore.tempAvatar.find((avatar) => avatar.campusId === student.studentId)
                        if(avatar)
                            avatar = avatar.url
                        studentData.push({
                            studentId: student.studentId,
                            name: student.name,
                            gender: student.gender,
                            degree: student.degree,
                            major: student.major,
                            info: student.info,
                            avatar: avatar
                        })
                    }
                }
                studentData.sort((a, b) => {
                    return a.studentId - b.studentId
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
