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
            return {authData: action.authData};
        default:
            return state
    }
};

export default loginReducer;