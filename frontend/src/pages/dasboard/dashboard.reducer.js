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
        case constants.actionTypes.DASHBOARD_SET_OPERATIONS:
            return {...state, operations: action.operations};
        case constants.actionTypes.DASHBOARD_ADD_OPERATION:
            let newOperation = {...action.operation, id: action.id};
            return {...state, operations: [...state.operations, newOperation]};
        case constants.actionTypes.DASHBOARD_REMOVE_OPERATION:
            let operations1 = state.operations.filter(item => item.id != action.id);
            return {...state, operations: operations1};
        case constants.actionTypes.DASHBOARD_UPDATE_OPERATION:
            let operations2 = state.operations.map(item => {
                if (item.id == action.id) {
                    return action.operation;
                }
                return item;
            });
            return {...state, operations: operations2};
        default:
            return state;
    }
};

export default dashboardReducer;