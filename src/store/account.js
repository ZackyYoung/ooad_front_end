import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useAccountStore = defineStore('account', () => {
    const accountValid = ref(false)
    const accountRole = ref(null)
    const accountCampusId = ref(null)
    const msg = ref("")
    const checkCodeCorrect = ref(false)

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
            studentInformationForm.studentId = resp.data.data.studentId
            studentInformationForm.name = resp.data.data.name
            studentInformationForm.gender = resp.data.data.gender
            studentInformationForm.degree = resp.data.data.degree
            studentInformationForm.major = resp.data.data.major
            studentInformationForm.info = resp.data.data.info
            resolve()
        })
    })
}

async function loginCheck (loginForm) {
        return new Promise((resolve, reject) => {
            dataService.loginCheck(loginForm, async resp => {
                if (resp.data.code === 0) {
                    accountRole.value = resp.data.data.role
                    accountValid.value = true
                    accountCampusId.value = loginForm.campusId
                    msg.value = '登录成功！'
                    window.sessionStorage.setItem("campusId", loginForm.campusId)
                    window.sessionStorage.setItem("role", resp.data.data.role)
                    resolve()
                } else {
                    accountValid.value = false
                    switch (resp.data.code)
                    {
                        case 4:
                            msg.value = '账号或密码错误！'
                            break
                        case 3:
                            msg.value = '用户未注册！'
                            break
                    }
                    resolve()
                }
            });
        });
    }

async function registerAccount (registerForm) {
        return new Promise((resolve, reject) => {
            dataService.registerAccount(registerForm, resp => {
                if (resp.data.code === 0) {
                    accountRole.value = resp.data.data.role
                    accountValid.value = true
                    accountCampusId.value = registerForm.campusId
                    msg.value = '注册成功！'
                    window.sessionStorage.setItem("campusId", registerForm.campusId)
                    window.sessionStorage.setItem("role", resp.data.data.role)
                    resolve()
                } else {
                    accountValid.value = false
                    switch (resp.data.code)
                    {
                        case 6:
                            msg.value = '该校园号已经被注册'
                            break
                    }
                    resolve()
                }
            })
        })
    }

async function editPassword (editPasswordForm) {
        return new Promise((resolve, reject) => {
            dataService.editPassword({
                campusId: accountCampusId.value,
                oldPassword: editPasswordForm.oldPasswd,
                newPassword: editPasswordForm.newPasswd
            },resp => {
                if(resp.data.code === 0)
                {
                    msg.value = "修改密码成功！"
                    resolve()
                }
                else
                {
                    switch (resp.data.code)
                    {
                        case 5:
                            msg.value = '旧密码错误！'
                            break
                    }
                    resolve()
                }
            })
        })
}

async function directEditPassword(form)
{
    return new Promise((resolve, reject) => {
        dataService.directEditPassword({
            campusId: accountCampusId.value,
            password: form.newPasswd
        },resp => {
            if(resp.data.code === 0)
            {
                msg.value = '重置密码成功！'
                resolve()
            }
            else
            {
                switch (resp.data.code)
                {
                    case 404:
                        msg.value = '用户不存在！'
                        break
                }
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
                msg.value = "创建学生成功！"
            }
            resolve()
        })
    })
}

async function updateStudent(form){
    return new Promise((resolve, reject) => {
        dataService.updateStudent(form, resp => {
            if (resp.data.code === 0) {
                msg.value = "更新信息成功！"
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
            if(resp.data.code === 0)
            {
                msg.value = '删除用户成功！'
            }
            else
                msg.value = resp.data.msg
            resolve()
        })
    })
}

async function sendCheckCode(mail)
{
    return new Promise((resolve) =>{
        dataService.sendCheckCode(mail, resp=>{
            resolve()
        })
    })
}

async function verifyCheckCode(mail, checkCode)
{
    return new Promise((resolve) => {
        dataService.verifyCheckCode({
            email: mail,
            verificationCode: checkCode
        }, resp => {
            checkCodeCorrect.value = (resp.data.code === 0)
            resolve()
        })
    })
}

    return {
        accountValid,
        accountRole,
        accountCampusId,
        msg,
        checkCodeCorrect,
        loginCheck,
        registerAccount,
        fetchInformation,
        editPassword,
        studentInformationForm,
        createStudent,
        updateStudent,
        deleteUser,
        refreshSession,
        sendCheckCode,
        verifyCheckCode,
        directEditPassword
    }
})
