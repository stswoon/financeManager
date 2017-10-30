import {message} from "antd";

import constants from "../../utils/constants";
import Request from "../../services/request.service";
import {dashbboardService} from "./dashboard.service";

export const dashboardActions = {
    loadProjects,
    setCurrentProject,
    restoreCurrentProject
};

function loadProjects(userId) {
    console.info("Getting projects for userId = " + userId);
    return async (dispatch) => {
        dispatch(loading(true));
        let request = new Request("GET", constants.getProjectsUrl.replace("{userId}", userId));
        try {
            let response = await request.send();
            dispatch(storeProjects(response));
        } catch (response) {
            message.error(response);
        }
        dispatch(loading(false));
    };
}

function setCurrentProject(projectId) {
    dashbboardService.saveLastProject(projectId);
    return {type: constants.actionTypes.DASHBOARD_CURRENT_PROJECT, projectId};
}

function restoreCurrentProject() {
    let projectId = dashbboardService.restoreLastProject();
    console.info("Restore project (if null project will not be restored), projectId=" + projectId);
    if (projectId) {
        return setCurrentProject(projectId);
    }
}



//private api below

function loading(loading) {
    return {type: constants.actionTypes.DASHBOARD_LOADING, loading}
}

function storeProjects(projects) {
    return {type: constants.actionTypes.DASHBOARD_STORE_PROJECTS, projects}
}

