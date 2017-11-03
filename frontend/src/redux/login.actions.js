//http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example

import {loginService} from "../services/login.service";
import constants from "../utils/constants";
import {message} from "antd";
import Request from "../services/request.service";

// export const LOGIN_CHANGE_MODE = 'LOGIN_CHANGE_MODE';
// export const changeMode = (mode) => {
//     return {
//         type: LOGIN_CHANGE_MODE,
//         mode
//     }
// };
//

export const loginActions = {
    restoreLogin,
    login,
    logout,
    register
};

function login(username, password) {
    console.info("Start logging");
    return (dispatch) => {
        dispatch(loading({loading: true}));
        loginService.login(username, password).then(result => {
            dispatch(loading({loading: false}));
            switch (result.type) {
                case loginService.loginResultTypes.SUCCESS:
                    console.info("Logged success");
                    Request.setApplicationProps({authToken: result.authData.bearerToken});
                    dispatch(success(result.authData));
                    break;
                case loginService.loginResultTypes.FAILED:
                    console.info("Login or password are incorrect, response: ", response);
                    message.warning(constants.incorrectCredentialsMessage);
                    dispatch(failure(constants.incorrectCredentialsMessage));
                    break;
            }
        }).catch(error => {
            dispatch(loading({loading: false}));
            message.error(constants.unexpectedErrorMessage);
            console.error("Failed to login user, response: ", error.response);
        });
    };
}

function logout() {
    loginService.logout();
    return {type: constants.actionTypes.LOGIN_LOGOUT};
}

function register(username, password) {
    console.info("Register new user");
    return async (dispatch) => {
        dispatch(loading({loading: true}));
        try {
            let result = await loginService.register(username, password);
            if (result.type == loginService.loginResultTypes.SUCCESS) {
                dispatch(login(username, password));
                console.info("Registration success");
            } else {
                message.warning(constants.incorrectRegistrationMessage);
                console.info("User already exist");
            }
        } catch (response) {
            console.info("Registration failed, response: ", response);
            message.error(constants.unexpectedErrorMessage)
        }
        dispatch(loading({loading: false}));
    };
}

function restoreLogin() {
    let authData = loginService.restoreLogin();
    Request.setApplicationProps({authToken: authData.bearerToken});
    return {type: constants.actionTypes.LOGIN_CHECK, authData};
}

//private api below

function loading(loading) {
    return {type: constants.actionTypes.LOGIN_LOADING, loading}
}

function failure(error) {
    return {type: constants.actionTypes.LOGIN_ERROR, error}
}

function success(authData) {
    return {type: constants.actionTypes.LOGIN_SUCCESS, authData}
}

