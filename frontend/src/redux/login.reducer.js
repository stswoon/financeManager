import constants from "../utils/constants";

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.actionTypes.LOGIN_LOGOUT:
            return {};
        case constants.actionTypes.LOGIN_LOADING:
            return {loading: action.loading};
        case constants.actionTypes.LOGIN_ERROR:
            return {error: action.error};
        case constants.actionTypes.LOGIN_SUCCESS:
            return success(action.authData);
        case constants.actionTypes.LOGIN_CHECK:
            if (action.authData) {
                return success(action.authData)
            } else {
                return {restoreAuthAttempt: true};
            }
        default:
            return state
    }
};

function success(authData) {
    return {authData}
}

export default loginReducer;