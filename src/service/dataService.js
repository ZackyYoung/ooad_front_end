import axios from 'axios'
import app from "../App.vue";

const dataServerUrl = "http://10.26.80.100:8082";

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

function editPassword(param, callback) {
    const url = `${dataServerUrl}/user/updatePassword`
    axiosInstance.post(url, param)
        .then(resp =>{
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function updateStudent(param, callback) {
    const url = `${dataServerUrl}/student/update`
    axiosInstance.post(url, param)
        .then(resp =>{
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function fetchInformation(campusId, role, callback){
    if(role === 'teacher'){
        const url = `${dataServerUrl}/teacher/findById/${campusId}`
        axiosInstance.get(url)
            .then(resp =>{
                callback(resp)
            }, errResp => {
                console.log(errResp)
            })
    }else if(role === 'student'){
        const url = `${dataServerUrl}/student/findById/${campusId}`
        axiosInstance.get(url)
            .then(resp =>{
                callback(resp)
            }, errResp => {
                console.log(errResp)
            })
    }
}

function findAllStudent(callback)
{
    const url = `${dataServerUrl}/student/findAll`
    axiosInstance.get(url)
        .then(resp =>{
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
export default{
    loginCheck,
    registerAccount,
    editPassword,
    updateStudent,
    fetchInformation,
    findAllStudent
}
