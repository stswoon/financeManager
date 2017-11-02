import constants from "../../../src/utils/constants";
import Request from "../../services/request.service";

function saveLastProject(projectId) {
    localStorage.setItem(constants.lastProjectId, projectId);
}

function restoreLastProject() {
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
    let request = new Request("PUT",  constants.getOperationsUrl.replace("{projectId}", projectId), operationData);
    let response = await request.send();
    return response;
}

async function updateOperation(operationData, operationId) {
    let request = new Request("POST",  constants.updateOperationUrl.replace("{id}", operationId), operationData);
    let response = await request.send();
    return response;
}

async function removeOperation(operationId) {
    let request = new Request("DELETE",  constants.updateOperationUrl.replace("{id}", operationId));
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
    removeOperation
};