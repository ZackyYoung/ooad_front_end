import axios from 'axios'

const dataServerUrl = "http://10.21.98.136:8181";

function loginCheck(param, callback) {
    const url = `${dataServerUrl}/api/user/v1/login`
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function registerAccount(param, callback) {
    const url = `${dataServerUrl}/api/user/v1/register`
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
export default{
    loginCheck,
    registerAccount
}
