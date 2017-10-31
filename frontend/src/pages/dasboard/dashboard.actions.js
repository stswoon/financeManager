import {message} from "antd";

import constants from "../../utils/constants";
import {dashboardService} from "./dashboard.service";

export const dashboardActions = {
    loadProjects,
    setCurrentProject,
    restoreCurrentProject,
    loadOperations,
    createOperation
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
    console.info("Create projectId = " + projectId + " operation: ", operationData);
    return async (dispatch) => {
        dispatch(loading(true));
        try {
            let operations = await dashboardService.createOperation(operationData, projectId);
            //todo dispatch(setOperations(operations));
            dispatch(loadOperations(projectId));
        } catch (response) {
            message.error(response);
        }
        dispatch(loading(false));
    };
}



//private api below

function loading(loading) {
    return {type: constants.actionTypes.DASHBOARD_LOADING, loading}
}

function storeProjects(projects) {
    return {type: constants.actionTypes.DASHBOARD_STORE_PROJECTS, projects}
}

function setOperations(operations) {
    return {type: constants.actionTypes.DASHBOARD_SET_OPERATIONS, operations}
}
