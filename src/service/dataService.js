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
    const url = `${dataServerUrl}/${role}/findById/${campusId}`
    axiosInstance.get(url)
        .then(resp =>{
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
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

function deleteUser(delete_id, callback)
{
    const url = `${dataServerUrl}/student/deleteById/${delete_id}`
    axiosInstance.delete(url)
        .then(resp =>{
            callback(resp)
        }, errResp =>{
            console.log(errResp)
        })
}

function findAllTeam(callback)
{
    const url = `${dataServerUrl}/team/findAll`
    axiosInstance.get(url)
        .then(resp =>{
            callback(resp)
        }, errResp =>{
            console.log(errResp)
        })
}

function findTeam(studentId, callback)
{
    const url = `${dataServerUrl}/team/isInTeam/${studentId}`
    axiosInstance.get(url)
        .then(resp =>{
            callback(resp)
        }, errResp =>{
            console.log(errResp)
        })
}

function createTeam(param, callback){
    const url = `${dataServerUrl}/team/addTeam`
    axiosInstance.post(url, param)
        .then(resp =>{
            callback(resp)
        }, errResp =>{
            console.log(errResp)
        })
}

function deleteMember(studentId, callback){
    const url = `${dataServerUrl}/team/deleteMember/${studentId}`
    axiosInstance.delete(url)
        .then(resp =>{
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}
function deleteTeam(creatorId, callback){
    const url = `${dataServerUrl}/team/deleteByCreator/${creatorId}`
    axiosInstance.delete(url)
        .then(resp =>{
            callback(resp)
        }, errResp =>{
            console.log(errResp)
        })
}

function alterLeader(param, callback){
    const url = `${dataServerUrl}/team/alterLeader`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addMember(param, callback){
    const url = `${dataServerUrl}/team/addMember`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function addInvitation(param, callback){
    const url = `${dataServerUrl}/invitation/addInvitation`
    axiosInstance.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getStudentRelatedInvitation(studentId, callback){
    const url = `${dataServerUrl}/invitation/findStudentRelated/${studentId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function getTeamRelatedInvitation(teamId, callback){
    const url = `${dataServerUrl}/invitation/findTeamRelated/${teamId}`
    axiosInstance.get(url)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function deleteInvitation(param, callback){
    const url = `${dataServerUrl}/invitation/deleteInvitation`
    axiosInstance.post(url, param)
        .then(resp => {
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
    findAllStudent,
    deleteUser,
    findAllTeam,
    findTeam,
    createTeam,
    deleteMember,
    deleteTeam,
    alterLeader,
    addMember,
    addInvitation,
    getTeamRelatedInvitation,
    getStudentRelatedInvitation,
    deleteInvitation
}
