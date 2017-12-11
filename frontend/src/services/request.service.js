import jQuery from "jquery";
import lodash from "lodash";

const defaultRequest = {
    type: "GET",
    headers: {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
    }
};

let applicationProps = {};

let errorResponseHandler = function (response) {
    alert("Response status = " + response.status);
};

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
     *   authToken : string
     *   urlPrefix : string
     * }
     */
    static setApplicationProps(props) {
        lodash.merge(applicationProps, props);
    }

    static clearApplicationProps() {
        applicationProps = {};
    }

    /**
     * Set function to handle remote errors.
     * @param func : Function - function(response) {}
     */
    static setErrorResponseHandler(func) {
        errorResponseHandler = func
    }

    /**
     * Send request
     * @param disableDefaultAuthCatch : boolean - disable error handler set in {@link Request.setErrorResponseHandler}
     * or default one
     * @param disablePrefix : boolean - disable to add prefix set in {@link Request.setApplicationProps}
     * @return {Promise}
     */
    send(disableDefaultAuthCatch = false, disablePrefix = false) {
        const authorizationHeader = applicationProps.authToken ?
            {headers: {Authorization: "Bearer " + applicationProps.authToken}} : {};
        let request = lodash.merge({}, defaultRequest, authorizationHeader, this.requestProps);
        if (disablePrefix == false && startWith(request.url, "http") == false) {
            request.url = applicationProps.urlPrefix + request.url;
        }

        // eslint-disable-next-line no-undef
        const promise = new Promise((resolve, reject) => {
            jQuery.ajax(request)
                .then(resolve)
                .catch((response) => {
                    if (!disableDefaultAuthCatch && errorResponseHandler) {
                        errorResponseHandler(response);
                    }
                    reject(response);
                })
        });
        return promise;
    }
}

function startWith(str, substr) {
    return str.indexOf(substr) === 0;
}

//todo axios (https://daveceddia.com/ajax-requests-in-react/) or fetch
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