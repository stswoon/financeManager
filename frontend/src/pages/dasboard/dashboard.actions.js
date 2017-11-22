import {message} from "antd";

import constants from "../../utils/constants";
import {dashboardService} from "./dashboard.service";
import {loginActions} from "../login/login.actions";

export const dashboardActions = {
    loadProjects,
    setCurrentProject,
    restoreCurrentProject,
    loadOperations,
    createOperation,
    updateOperation,
    removeOperation,
    logout,
    removeProject,
    createProject
};

function loadProjects(userId) {
    console.info("Getting projects for userId = " + userId);
    return async (dispatch) => {
        dispatch(loading(true));
        try {
            let projects = await dashboardService.loadProjects(userId);
            dispatch(storeProjects(projects));
        } catch (response) {
            message.error(response);
        }
        dispatch(loading(false));
    };
}

function setCurrentProject(projectId) {
    return async (dispatch) => {
        dashboardService.saveLastProject(projectId);
        dispatch({type: constants.actionTypes.DASHBOARD_CURRENT_PROJECT, projectId});
        dispatch(loadOperations(projectId));
    };
}

function restoreCurrentProject() {
    let projectId = dashboardService.restoreLastProject();
    console.info("Restore project (if null project will not be restored), projectId=" + projectId);
    if (projectId) {
        return setCurrentProject(projectId);
    } else {
        return {type: constants.actionTypes.DASHBOARD_CURRENT_PROJECT, projectId: null};
    }
}

function loadOperations(projectId) {
    console.info("Loading operations for projectId = " + projectId);
    return async (dispatch) => {
        dispatch(loading(true));
        try {
            let operations = await dashboardService.loadOperations(projectId);
            dispatch(setOperations(operations));
        } catch (response) {
            message.error(response);
        }
        dispatch(loading(false));
    };
}

function createOperation(operationData, projectId) {
    console.info("Create operation: {} for projectId = {}", operationData, projectId);
    return async (dispatch) => {
        dispatch(loadingCreate(true));
        try {
            let operationId = await dashboardService.createOperation(operationData, projectId);
            let operation = {...operationData, id: operationId};
            dispatch(_addOperation(operation));
        } catch (response) {
            message.error(response);
        }
        dispatch(loadingCreate(false));
    };
}

function updateOperation(operationData) {
    console.info("Update operationId = " + operationData.id + " operation: ", operationData);
    return async (dispatch) => {
        dispatch(loadingCreate(true));
        try {
            await dashboardService.updateOperation(operationData);
            dispatch(_updateOperation(operationData));
        } catch (response) {
            message.error(response);
        }
        dispatch(loadingCreate(false));
    };
}

function removeOperation(operationId) {
    console.info("Remove operationId = " + operationId);
    return async (dispatch) => {
        dispatch(loading(true));
        try {
            await dashboardService.removeOperation(operationId);
            dispatch(_removeOperation(operationId));
        } catch (response) {
            message.error(response);
        }
        dispatch(loading(false));
    };
}

function logout() {
    console.info("Logout");
    return dispatch => dispatch(loginActions.logout());
}

function createProject(name, userId) {
    console.info("Create project '{}'", name);
    return async (dispatch) => {
        dispatch(loading(true));
        try {
            let project = await dashboardService.createProject(userId, {name});
            dispatch(_addProject(project));
            //dispatch(setCurrentProject());
        } catch (response) {
            message.error(response);
        }
        dispatch(loading(false));
    };
}

function removeProject(id) {
    console.info("Remove project, id=" + id);
    return async (dispatch) => {
        try {
            await dashboardService.removeProject(id);
            dispatch(_removeProject(id));
        } catch (response) {
            message.error(response);
        }
    };
}


//private api below

function loading(loading) {
    return {type: constants.actionTypes.DASHBOARD_LOADING, loading}
}

function loadingCreate(loading) {
    return {type: constants.actionTypes.DASHBOARD_LOADING_CREATE_UPDATE, loading}
}

function storeProjects(projects) {
    return {type: constants.actionTypes.DASHBOARD_STORE_PROJECTS, projects}
}

function setOperations(operations) {
    return {type: constants.actionTypes.DASHBOARD_SET_OPERATIONS, operations}
}

function _removeOperation(id) {
    return {type: constants.actionTypes.DASHBOARD_REMOVE_OPERATION, id}
}

function _updateOperation(operation) {
    return {type: constants.actionTypes.DASHBOARD_UPDATE_OPERATION, operation}
}

function _addOperation(operation) {
    return {type: constants.actionTypes.DASHBOARD_ADD_OPERATION, operation}
}

function _removeProject(id) {
    return {type: constants.actionTypes.DASHBOARD_REMOVE_PROJECT, id}
}

function _addProject(project) {
    return {type: constants.actionTypes.DASHBOARD_ADD_PROJECT, project}
}

