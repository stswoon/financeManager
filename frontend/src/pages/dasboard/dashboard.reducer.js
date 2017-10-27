import constants from "../../utils/constants";

let loadingCount = 0;

const dashboardReducer = (state = {projects:[]}, action) => {
    switch (action.type) {
        case constants.actionTypes.DASHBOARD_LOADING:
            if (action.loading) {
                loadingCount++;
            } else {
                loadingCount--;
                if (loadingCount < 0) {
                    throw new Error("Illegal state in dashboardReducer: loadingCount < 0");
                }
            }
            return {...state, loading: loadingCount == 0};
        case constants.actionTypes.DASHBOARD_STORE_PROJECTS:
            return {
                ...state,
                projects: action.projects,
                currentProjectId: state.currentProjectId || (action.projects.length > 0 && action.projects[0]) //todo set current project in localStorage
            };
        case constants.actionTypes.DASHBOARD_CURRENT_PROJECT:
            return {...state, currentProjectId: action.projectId};
        default:
            return state;
    }
};

export default dashboardReducer;