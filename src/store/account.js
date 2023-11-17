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
    function loginCheck () {
        dataService.loginCheck(loginForm, resp => {
            if (resp.status === 200) {
                accountRole.value = resp.data.role
                accountValid.value = true
            }
            else{
                accountValid.value = false
                errorMsg.value = resp.data.msg
            }
        })
    }

    const registerForm = reactive({
        campusId: "",
        role: "",
        password: "",
        confirmPassword: ""
    })

    function registerAccount () {
        dataService.registerAccount(registerForm, resp => {
            if (resp.status === 200) {
                accountRole.value = resp.data.role
                accountValid.value = true
            } else {
                accountValid.value = false
                errorMsg.value = resp.data.msg
            }
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

// const state = () =>({
//     loginForm: {
//         "campusId": "",
//         "password": ""
//     },
//     registerForm: {
//         "campusId": "",
//         "role": "",
//         "password": "",
//         "confirmPassword": ""
//     },
//     accountValid: false,
//     accountRole: null,
//     errorMsg: null
// })
//
// const actions = {
//     loginCheck(context) {
//         dataService.loginCheck(context.state.loginForm, resp => {
//             if (resp.status === 200) {
//                 context.commit("updateRole", resp.data.role)
//                 context.commit("changeAccountStatus", true)
//             }
//         })
//     },
//     registerAccount(context) {
//         dataService.registerAccount(context.state.registerForm, resp => {
//             if (resp.data.code === 200) {
//                 context.commit("updateRole", resp.data.role)
//                 context.commit("changeAccountStatus", true)
//             } else {
//                 context.state.errorMsg = resp.data.msg
//             }
//         })
//     },
// }
//
// const mutations = {
//     changeAccountStatus(state, status) {
//         state.accountValid = status
//     },
//     updateRole(state, role){
//         state.accountRole = role
//     }
// }
// export default {
//     namespaced: true,
//     state,
//     actions,
//     mutations
// }
