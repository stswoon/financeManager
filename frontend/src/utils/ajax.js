import jQuery from "jquery";
import lodash from "lodash";
import Cookie from "js-cookie";

import constants from "./constants";

const defaultRequest = {
    type: "GET",
    headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
    }
};

let applicationProps = {};

//todo axios
class Request {
    /**
     * Set jQuery props or just type+url+data
     * @param type
     * @param url
     * @param [data]
     */
    constructor(type, url, data) {
        if (arguments.length == 1) {
            let props = arguments[0];
            this.requestProps = props;
        } else {
            this.requestProps = {type, url};
            if (data) {
                this.requestProps.data = JSON.stringify(data);
            }
        }
    }

    /**
     * @param props
     * {
     *   urlPrefix : string
     * }
     */
    static setApplicationProps(props) {
        lodash.merge(applicationProps, props);
    }

    static clearApplicationProps() {
        applicationProps = {};
    }

    send(disableDefaultAuthCatch = false) {
        const bearerToken = Cookie.getJSON(constants.authenticationCookieName).bearerToken;
        const cookieProps = {headers: {Authorization: "Bearer " + bearerToken}};

        let request = lodash.merge({}, defaultRequest, cookieProps, applicationProps, this.requestProps);
        if (request.url.startsWith("http") == false) {
            request.url = applicationProps.urlPrefix + request.url;
        }

        const promise = new Promise((resolve, reject) => {
            jQuery.ajax(request)
                .then(resolve)
                .catch((response) => {
                    if (!disableDefaultAuthCatch) {
                       if (response.status === 401) {
                           alert("401"); //todo redirect on login page
                       }
                    }
                    reject(response);
                })
        });
        return promise;
    }
}

//https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
//https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
// var config = {
//     method: this.isRegistration() ? "POST" : "GET",
//     headers: new Headers({
//         'Accept': 'application/json;charset=UTF-8',
//         'Content-Type': 'application/json;charset=UTF-8'
//     }),
//     // mode: "cors",
//     mode: "no-cors",
//     // body: JSON.stringify({...this.state, name: this.state.login})
//     body: JSON.stringify({login: this.state.login, password: this.state.password})
// };
// (async () => {
//     try {
//         let response = await fetch(envData.gateway + "/user", config);
//         // let response = await fetch(envData.gateway + "/backend/user", config);
//         let user = response.json();
//         alert("Done, userId = " + user.id);
//     } catch (response) {
//         alert("Failed to operate with user, reason: " + response.json().error);
//     }
// })();

export default Request;