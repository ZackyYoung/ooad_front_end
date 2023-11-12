import dataService from "../../service/dataService.js";
const state = () =>({
    loginForm: {
        "campusId": "",
        "password": ""
    },
    registerForm: {
        "campusId": "",
        "password": "",
        "role": "",
        "comfirmPassword": ""
    },
    accountValid: false,
    accountRole: null,
    errorMsg: null
})

const actions = {
    loginCheck(context) {
        dataService.loginCheck(context.state.loginForm, resp => {
            if (resp.status === 200) {
                context.commit("updateRole", resp.data.role)
                context.commit("changeAccountStatus", true)
            }
        })
    },
    registerAccount(context) {
        //console.log(context.state.form)
        dataService.registerAccount(context.state.registerForm, resp => {
            if (resp.data.code === 200) {
                context.commit("changeAccountStatus", true)
            } else {
                context.state.errorMsg = resp.data.msg
            }
        })
    },
}

const mutations = {
    changeAccountStatus(state, status) {
        state.accountValid = status
    },
    updateRole(state, role){
        state.accountRole = role
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
