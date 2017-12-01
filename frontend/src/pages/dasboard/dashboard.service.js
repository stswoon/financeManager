import constants from "../../../src/utils/constants";
import Request from "../../services/request.service";

function saveLastProject(projectId) {
    console.log("anneq404");
    localStorage.setItem(constants.lastProjectId, projectId);
}

function restoreLastProject() {
    console.log("anneq406");
    try {
        throw new Error("anneq");
    } catch (e) {
        console.error("anneq410::", e)
    }
    return localStorage.getItem(constants.lastProjectId);
}

async function loadProjects(userId) {
    let response = await (new Request("GET", constants.getProjectsUrl.replace("{userId}", userId))).send();
    const projects = response;
    return projects;
}

async function loadOperations(projectId) {
    let response = await (new Request("GET", constants.getOperationsUrl.replace("{projectId}", projectId))).send();
    const operations = response;
    return operations;
}

async function createOperation(operationData, projectId) {
    let request = new Request("PUT", constants.getOperationsUrl.replace("{projectId}", projectId), operationData);
    let response = await request.send();
    return response;
}

async function updateOperation(operationData) {
    let request = new Request("POST", constants.updateOperationUrl.replace("{id}", operationData.id), operationData);
    let response = await request.send();
    return response;
}

async function removeOperation(operationId) {
    let request = new Request("DELETE", constants.updateOperationUrl.replace("{id}", operationId));
    let response = await request.send();
    return response;
}

async function createProject(userId, projectData) {
    let request = new Request("PUT", constants.createProjectUrl.replace("{userId}", userId), projectData);
    let response = await request.send();
    return response;
}

async function removeProject(id) {
    let request = new Request("DELETE", constants.removeProjectUrl.replace("{id}", id));
    let response = await request.send();
    return response;
}


export const dashboardService = {
    saveLastProject,
    restoreLastProject,
    loadOperations,
    loadProjects,
    createOperation,
    updateOperation,
    removeOperation,
    createProject,
    removeProject
};