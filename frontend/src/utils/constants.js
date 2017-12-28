const constants = {
    registerUrl: "/auth/user",
    //loginUrl: "https://stswoon-fm-auth.herokuapp.com" + "/auth/oauth/token?grant_type=password&username={login}&password={password}";
    serverLoginUrl: "/serverLogin",
    loginUrl: "/auth/oauth/token",
    logoutUrl: "/auth/exit",
    checkTokenUrl: "/auth/oauth/check_token?token={token}",
    getProjectsUrl: "/backend/project/{userId}",
    getOperationsUrl: "/backend/operation/{projectId}",
    updateOperationUrl: "/backend/operation/{id}",
    createProjectUrl: "/backend/project/{userId}",
    removeProjectUrl: "/backend/project/{id}",
    statisticsUrl: "/backend/statistics/{projectId}",

    authenticationKey: "authentication",
    lastProjectId: "lastProjectId",

    actionTypes: {
        LOGIN_LOADING: "LOGIN_LOADING",
        LOGIN_SUCCESS: "LOGIN_SUCCESS",
        LOGIN_ERROR: "LOGIN_ERROR",
        LOGIN_LOGOUT: "LOGIN_LOGOUT",
        LOGIN_CHECK: "LOGIN_CHECK",

        DASHBOARD_LOADING_CREATE_UPDATE: "DASHBOARD_LOADING_CREATE_UPDATE",
        DASHBOARD_LOADING: "DASHBOARD_LOADING",
        DASHBOARD_STORE_PROJECTS: "DASHBOARD_STORE_PROJECTS",
        DASHBOARD_CURRENT_PROJECT: "DASHBOARD_CURRENT_PROJECT",
        DASHBOARD_SET_OPERATIONS: "DASHBOARD_SET_OPERATIONS",
        DASHBOARD_UPDATE_OPERATION: "DASHBOARD_UPDATE_OPERATION",
        DASHBOARD_REMOVE_OPERATION: "DASHBOARD_REMOVE_OPERATION",
        DASHBOARD_ADD_OPERATION: "DASHBOARD_ADD_OPERATION",
        DASHBOARD_REMOVE_PROJECT: "DASHBOARD_REMOVE_PROJECT",
        DASHBOARD_ADD_PROJECT: "DASHBOARD_ADD_PROJECT",
        DASHBOARD_CHANGE_LANGUAGE: "DASHBOARD_CHANGE_LANGUAGE"
    },

    dateFormat: "DD.MM.YYYY",

    defaultLabels: {
        operationPopup: {
            create: "Create",
            update: "Update"
        },
        operationTable: {
            newOperation: "New Operation",
            operations: "Operations"
        },
        notifications: {
            incorrectRegistrationMessage: "Such user is exist",
            incorrectCredentialsMessage: "Login or password are incorrect",
            unexpectedErrorMessage: "Unexpected error, please contact your administrator"
        },
        projectMenu: {
            projects: "Projects"
        },
        table: {
            comment: "Comment",
            value: "Value",
            date: "Date",
            action: "Action",
            edit: "Edit",
            remove: "Remove"
        }
    }
};

export default constants;