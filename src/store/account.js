import dataService from "@/service/dataService.js";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useAccountStore = defineStore('account', () => {
    const accountValid = ref(false)
    const accountRole = ref(null)
    const errorMsg = ref(null)
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
                    resolve()
                } else {
                    accountValid.value = false
                    errorMsg.value = resp.data.msg
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
                    resolve()
                } else {
                    accountValid.value = false
                    errorMsg.value = resp.data.msg
                    resolve()
                }
            })
        })
    }

    return {
        accountValid,
        accountRole,
        errorMsg,
        loginForm,
        loginCheck,
        registerForm,
        registerAccount
    }
})
