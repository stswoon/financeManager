const constants = {
        //loginUrl: "https://stswoon-fm-auth.herokuapp.com" + "/auth/oauth/token?grant_type=password&username={login}&password={password}";
        loginUrl: "/auth/oauth/token?grant_type=password&username={login}&password={password}", //todo post!!!
        checkTokenUrl: "/auth/oauth/check_token?token={token}",
        getProjectsUrl: "/backend/project/{userId}",
        getOperationsUrl: "/backend/operation/{projectId}",
        updateOperationUrl: "/backend/operation/{id}",

        incorrectCredentialsMessage: "Login or password are incorrect",
        unexpectedErrorMessage: "Unexpected error, please contact your administrator",

        authenticationCookieName: "authentication",
        lastProjectId: "lastProjectId",

        actionTypes: {
            LOGIN_LOADING: 'LOGIN_LOADING',
            LOGIN_SUCCESS: 'LOGIN_SUCCESS',
            LOGIN_ERROR: 'LOGIN_ERROR',
            LOGIN_LOGOUT: 'LOGIN_LOGOUT',
            LOGIN_CHECK: 'LOGIN_CHECK',

            DASHBOARD_LOADING: 'DASHBOARD_LOADING',
            DASHBOARD_STORE_PROJECTS: 'DASHBOARD_STORE_PROJECTS',
            DASHBOARD_CURRENT_PROJECT: 'DASHBOARD_CURRENT_PROJECT',
            DASHBOARD_SET_OPERATIONS: 'DASHBOARD_SET_OPERATIONS',
            DASHBOARD_UPDATE_OPERATION: 'DASHBOARD_UPDATE_OPERATION',
            DASHBOARD_REMOVE_OPERATION: 'DASHBOARD_REMOVE_OPERATION',
            DASHBOARD_ADD_OPERATION: 'DASHBOARD_ADD_OPERATION'
        },

        dateFormat: 'DD.MM.YYYY',

        operationPopup: {
            create: "Create",
            update: "Update"
        }
    };

export default constants;