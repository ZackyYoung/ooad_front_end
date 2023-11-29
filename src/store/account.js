import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useAccountStore = defineStore('account', () => {
    const accountValid = ref(false)
    const accountRole = ref(null)
    const accountName = ref(null)
    const msg = ref("")
    const loginForm = reactive({
        campusId: "",
        password: ""
    })

async function loginCheck () {
        return new Promise((resolve, reject) => {
            dataService.loginCheck(loginForm, resp => {
                if (resp.data.code === 0) {
                    accountRole.value = resp.data.data.role
                    accountValid.value = true
                    dataService.fetchInformation(loginForm.campusId, accountRole.value, info =>{
                        accountName.value = info.data.data.name
                        window.sessionStorage.setItem("token", loginForm.campusId)
                        if(accountRole.value === "student"){
                            this.studentInformationForm = info.data.data
                        }

                    })
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

    const studentInformationForm = reactive({
        studentId: "",
        name: null,
        gender: null,
        degree: null,
        major: null,
        info: null
    })
async function registerAccount () {
        return new Promise((resolve, reject) => {
            dataService.registerAccount(registerForm, resp => {
                if (resp.data.code === 0) {
                    accountRole.value = resp.data.data.role
                    accountValid.value = true
                    window.sessionStorage.setItem("token", registerForm.campusId)
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
                campusId: loginForm.campusId,
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
        accountName,
        msg,
        loginForm,
        loginCheck,
        registerForm,
        registerAccount,
        editPasswordForm,
        editPassword,
        studentInformationForm,
        createStudent,
        updateStudent,
        deleteUser
    }
})
