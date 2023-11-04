import dataService from "../../service/dataService.js";
const state = () =>({
    form: {
        "campus_id": "",
        "password": "",
        "role": "",
        "comfirmPassword": ""
    },
    accountValid: false,
    errorMsg: null
})

const actions = {
    loginCheck(context) {
        dataService.loginCheck(context.state.form, resp => {
            if (resp.data.code === 0) {
                context.commit("changeAccountStatus", true)
            }
        })
    },
    registerAccount(context) {
        //console.log(context.state.form)
        dataService.registerAccount({
            "campus_id": context.state.form.campus_id,
            "role": context.state.form.role,
            "password": context.state.form.password,
            "confirmPassword": context.state.form.confirmPassword,
        }, resp => {
            //console.log(resp)
            if (resp.data.code === 0) {
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
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
