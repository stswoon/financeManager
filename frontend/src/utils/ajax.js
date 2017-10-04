import jQuery from "jQuery";
import lodash from "lodash"

const defaultRequest = {
    type: "GET",
    headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
    }
};

/**
 * {
 *   urlPrefix : "",
 *   headers: {
 *       Authorization: ""
 *   }
 * }
 */
let applicationProps = {};

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

    static setApplicationProps(props) {
        lodash.merge(applicationProps, props);
    }

    static clearApplicationProps() {
        applicationProps = {};
    }

    send() {
        let request = lodash.merge({}, defaultRequest, applicationProps, this.requestProps);
        if (request.url.startsWith("http") == false) {
            request.url = applicationProps.urlPrefix + request.url;
        }
        return jQuery.ajax(request);
    }
};

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