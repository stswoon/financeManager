import constants from "../../src/utils/constants";
import Request from "../../src/utils/ajax";

//import { authHeader } from '../_helpers';

// function login(username, password) {
// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password })
// };
//
// return fetch('/users/authenticate', requestOptions)
//     .then(response => {
//         if (!response.ok) {
//             return Promise.reject(response.statusText);
//         }
//
//         return response.json();
//     })
//     .then(user => {
//         // login successful if there's a jwt token in the response
//         if (user && user.token) {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));
//         }
//
//         return user;
//     });
// }
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

        //this.props.history.push('/dashboard/');
        console.debug("Login success, authData = ", authData);
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

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//
//     return fetch('/users', requestOptions).then(handleResponse);
// }
//
// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//
//     return fetch('/users/' + _id, requestOptions).then(handleResponse);
// }
//
// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//
//     return fetch('/users/register', requestOptions).then(handleResponse);
// }
//
// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//
//     return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
// }
//
// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };
//
//     return fetch('/users/' + id, requestOptions).then(handleResponse);;
// }
//
// function handleResponse(response) {
//     if (!response.ok) {
//         return Promise.reject(response.statusText);
//     }
//
//     return response.json();
// }


export const loginService = {
    login,
    logout,
    restoreLogin,
    loginResultTypes
};