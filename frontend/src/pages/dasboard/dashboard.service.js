import constants from "../../../src/utils/constants";

function saveLastProject(projectId) {
    localStorage.setItem(constants.lastProjectId, projectId);
}

function restoreLastProject() {
    return localStorage.getItem(constants.lastProjectId);
}

export const dashbboardService = {
    saveLastProject,
    restoreLastProject
};