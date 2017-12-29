import Cookies from "js-cookie";
import constants from "../../utils/constants";
import Request from "../../services/request.service";

const loginResultTypes = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED"
};


async function login(username, password) {
    console.debug("Starting login");

    try {
        let serverLogin = !!window.envData.serverLogin;
        let loginUrl = serverLogin ? constants.serverLoginUrl : constants.loginUrl;


        //serverLogin = true;
        //loginUrl = "http://localhost:5000" + constants.serverLoginUrl;

        let headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        };
        if (!serverLogin) {
            headers["Authorization"] = "Basic b2F1dGgyX2NsaWVudDpvYXV0aDJfY2xpZW50X3NlY3JldA==";
        }
        let request = new Request({
            type: "POST",
            url: loginUrl,
            data: Request.toParam({grant_type: "password", username, password}),
            headers
        });
        let response = await request.send(false, serverLogin);
        const bearerToken = response.access_token;
        console.info("Bearer token = " + bearerToken);

        response = await (new Request("GET", "/auth/user/" + username)).send();
        console.info("Login is sucessful, userId = " + response.id);

        let authData = {
            username: response.login,
            userId: response.id,
            bearerToken
        };
        console.log("anneq407");
        localStorage.setItem(constants.authenticationKey, JSON.stringify(authData));

        //SSR
        Cookies.set("auth-token", authData);

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
            let error = response;
            console.error("Unexpected flow during login user, error: ", error);
            throw error;
        }
    }
}

function restoreLogin() {
    let authData = null;
    try {
        authData = localStorage.getItem(constants.authenticationKey);
    } catch (e) {
        console.log("SSR::", e.message)
    }
    if (authData) {
        authData = JSON.parse(authData);
    }
    return authData;
}

async function logout() {
    console.log("we");
    localStorage.removeItem(constants.authenticationKey);
    localStorage.removeItem(constants.lastProjectId);
    Cookies.remove("auth-token");
    await new Request("GET", constants.logoutUrl).send();
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

    //return response;
}


export const loginService = {
    login,
    logout,
    register,
    restoreLogin,
    loginResultTypes
};