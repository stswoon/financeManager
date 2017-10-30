import constants from "../../utils/constants";

let loadingCount = 0;

const dashboardReducer = (state = {projects: []}, action) => {
    switch (action.type) {
        case constants.actionTypes.DASHBOARD_LOADING:
            loadingCount = action.loading ? loadingCount + 1 : loadingCount - 1;
            if (loadingCount < 0) {
                throw new Error("Illegal state in dashboardReducer: loadingCount < 0");
            }
            return {...state, loading: loadingCount == 0};
        case constants.actionTypes.DASHBOARD_STORE_PROJECTS:
            return {...state, projects: action.projects};
        case constants.actionTypes.DASHBOARD_CURRENT_PROJECT:
            return {...state, currentProjectId: action.projectId};
        default:
            return state;
    }
};

export default dashboardReducer;