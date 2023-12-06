import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useAccountStore = defineStore('account', () => {
    const accountValid = ref(false)
    const accountRole = ref(null)
    const accountCampusId = ref(null)
    const msg = ref("")
    const loginForm = reactive({
        campusId: "",
        password: ""
    })
    const studentInformationForm = reactive({
        studentId: "",
        name: null,
        gender: null,
        degree: null,
        major: null,
        info: null
    })

async function refreshSession()
{
    accountCampusId.value = window.sessionStorage.getItem("campusId")
    accountRole.value = window.sessionStorage.getItem("role")
    accountValid.value = true
}
async function fetchInformation()
{
    return new Promise((resolve, reject) => {
        dataService.fetchInformation(accountCampusId.value, accountRole.value, resp =>{
            this.studentInformationForm = {
                studentId: resp.data.data.studentId,
                name: resp.data.data.name,
                gender: resp.data.data.gender,
                degree: resp.data.data.degree,
                major: resp.data.data.major,
                info: resp.data.data.info
            }
            resolve()
        })
    })
}

async function loginCheck () {
        return new Promise((resolve, reject) => {
            dataService.loginCheck(loginForm, async resp => {
                if (resp.data.code === 0) {
                    accountRole.value = resp.data.data.role
                    accountValid.value = true
                    accountCampusId.value = loginForm.campusId
                    window.sessionStorage.setItem("campusId", loginForm.campusId)
                    window.sessionStorage.setItem("role", resp.data.data.role)
                    resolve()
                } else {
                    accountValid.value = false
                    msg.value = resp.data.msg
                    resolve()
                }
            });
        });
    }
    const registerForm = reactive({
        campusId: "",
        role: "",
        password: "",
        confirmPassword: ""
    })

async function registerAccount () {
        return new Promise((resolve, reject) => {
            dataService.registerAccount(registerForm, resp => {
                if (resp.data.code === 0) {
                    accountRole.value = resp.data.data.role
                    accountValid.value = true
                    accountCampusId.value = registerForm.campusId
                    window.sessionStorage.setItem("campusId", registerForm.campusId)
                    window.sessionStorage.setItem("role", resp.data.data.role)
                    resolve()
                } else {
                    accountValid.value = false
                    msg.value = resp.data.msg
                    resolve()
                }
            })
        })
    }
    const editPasswordForm = reactive({
        oldPasswd: "",
        newPasswd: "",
        newPasswdConfirm: ""
    })
async function editPassword () {
        return new Promise((resolve, reject) => {
            dataService.editPassword({
                campusId: accountCampusId.value,
                oldPassword: editPasswordForm.oldPasswd,
                newPassword: editPasswordForm.newPasswd
            },resp => {
                if(resp.data.code === 0)
                {
                    msg.value = "Edit password successfully!"
                    resolve()
                }
                else
                {
                    msg.value = resp.data.msg
                    resolve()
                }
            })
        })
}

async function createStudent(form) {
    return new Promise((resolve, reject) => {
        dataService.registerAccount({
            campusId: form.studentId,
            role: "student",
            password: "123456",
            confirmPassword: "123456"
        }, async resp => {
            if (resp.data.code === 0) {
                await updateStudent(form)
                msg.value = "Create student account successfully"
                resolve()
            } else {
                msg.value = resp.data.msg
                resolve()
            }
        })
    })
}

async function updateStudent(form){
    return new Promise((resolve, reject) => {
        dataService.updateStudent(form, resp => {
            if (resp.data.code === 0) {
                msg.value = "Update student information successfully"
                resolve()
            }
            else{
                msg.value = resp.data.msg
                resolve()
            }
        })
    })
}

async function deleteUser(delete_id){
    return new Promise((resolve, reject) => {
        dataService.deleteUser(delete_id, resp => {
            msg.value = resp.data.msg
            resolve()
        })
    })
}

    return {
        accountValid,
        accountRole,
        accountCampusId,
        msg,
        loginForm,
        loginCheck,
        registerForm,
        registerAccount,
        fetchInformation,
        editPasswordForm,
        editPassword,
        studentInformationForm,
        createStudent,
        updateStudent,
        deleteUser,
        refreshSession
    }
})
