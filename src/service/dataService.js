import axios from 'axios'
import app from "../App.vue";

const dataServerUrl = "http://10.28.8.68:8082";

const axiosInstance = axios.create({
    baseURL: dataServerUrl,
    withCredentials: true
});
function loginCheck(param, callback) {
    const url = `${dataServerUrl}/user/login`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function registerAccount(param, callback) {
    const url = `${dataServerUrl}/user/register`
    axiosInstance.post(url, param)
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
