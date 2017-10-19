//http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example

import {loginService} from "../../services/login.service";
import constants from "../../utils/constants";
import * as message from "antd";

export const LOGIN_CHANGE_MODE = 'LOGIN_CHANGE_MODE';
export const changeMode = (mode) => {
    return {
        type: LOGIN_CHANGE_MODE,
        mode
    }
};

export const LOGIN_SAVE_INPUTS = 'LOGIN_SAVE_INPUTS';
export const saveInputs = (inputs) => {
    return {
        type: LOGIN_SAVE_INPUTS,
        inputs
    }
};

export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';
export const saveInputs = (inputs) => {
    return {
        type: LOGIN_LOGOUT,
        inputs
    }
};

export const loginActions = {
    login,
    logout,
    register
};

function login(username, password) {
    console.info("Start logging");
    return (dispatch) => {
        dispatch(loading({loading: true}));
        try {
            let result = loginService.login(username, password);
            switch(result.type) {
                case loginService.loginResultTypes.SUCCESS:
                    console.info("Logged success");
                    dispatch(success(result.authData));
                    break;
                case loginService.loginResultTypes.FAILED:
                    console.info("Login or password are incorrect, response: ", response);
                    message.warning(constants.incorrectCredentialsMessage);
                    dispatch(failure(constants.incorrectCredentialsMessage));
                    break;
            }
        } catch (error) {
            message.error(constants.unexpectedErrorMessage);
            console.error("Failed to login user, response: ", error.response);
        }
        dispatch(loading({loading: false}));
    };
}

function logout() {
    loginService.logout();
    return {type: constants.actionTypes.LOGIN_LOGOUT};
}

function loading(loading) {
    return {type: constants.actionTypes.LOGIN_LOADING, loading}
}

function failure(error) {
    return {type: constants.actionTypes.LOGIN_ERROR, error}
}

function success(authData) {
    return {type: constants.actionTypes.LOGIN_SUCCESS, authData}
}

