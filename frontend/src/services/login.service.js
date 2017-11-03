import constants from "../../src/utils/constants";
import Request from "./request.service";

const loginResultTypes = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED"
};


async function login(username, password) {
    console.debug("Starting login");

    try {
        let loginUrl = constants.loginUrl.replace("{login}", username).replace("{password}", password);
        let request = new Request({
            type: "POST",
            url: loginUrl,
            headers: {
                'Authorization': 'Basic b2F1dGgyX2NsaWVudDpvYXV0aDJfY2xpZW50X3NlY3JldA==' //todo hide in node internal request
            }
        });
        let response = await request.send();
        const bearerToken = response.access_token;
        console.info("Bearer token = " + bearerToken);

        response = await (new Request("GET", "/auth/user/" + username)).send();
        console.info("Login is sucessful, userId = " + response.id);

        let authData = {
            username: response.login,
            userId: response.id,
            bearerToken
        };
        localStorage.setItem(constants.authenticationCookieName, JSON.stringify(authData));

        console.debug("Login success, authData = ", authData);
        //this.props.history.push('/dashboard/');
        return {type: loginResultTypes.SUCCESS, authData};
    } catch (response) {
        if (response.status == 400) {
            console.debug("Incorrect credentials");
            return {type: loginResultTypes.FAILED};
        } else if (response.status) {
            console.debug("Unexpected response on login user, response: ", response);
            let error = new Error("Unexpected response on login user");
            error.response = response;
            throw error;
        } else {
            error = response;
            console.error("Unexpected flow during login user, error: ", error);
            throw error;
        }
    }
}

function restoreLogin() {
    let authData = localStorage.getItem(constants.authenticationCookieName);
    if (authData) {
        authData = JSON.parse(authData);
    }
    return authData;
}

function logout() {
    localStorage.removeItem(constants.authenticationCookieName);
}

async function register(username, password) {
    console.debug("Starting register");

    let user = {login: username, password};
    let request = new Request("POST", constants.registerUrl, user);
    try {
        await request.send();
        return {type: loginResultTypes.SUCCESS};
    } catch (response) {
        //todo check refactor
        console.debug("Registration error response: ", {response: JSON.stringify(response)});
        if (JSON.stringify(response).indexOf("already exist") > -1) {
            return {type: loginResultTypes.FAILED};
        } else {
            let error = new Error();
            error.response = response;
            console.error("Unexpected flow during login user, error: ", error);
            throw error;
        }
    }

    return response;
}


export const loginService = {
    login,
    logout,
    register,
    restoreLogin,
    loginResultTypes
};