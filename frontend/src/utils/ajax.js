import jQuery from "jQuery";
import lodash from "lodash"

const defaultRequest = {
    type: "GET",
    headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
    }
};

let applicationProps = {
    urlPrefix : "",
    headers: {
        //'Authorization': ''
    }
};

class Request {
    constructor(props) {
        this.requestProps = props;
    }

    static setApplicationProps(props) {
        lodash.merge(applicationProps, props);
    }


    send() {
        let request = lodash.merge({}, defaultRequest, applicationProps, this.requestProps);
        if (request.url.startsWith("http") == false) {
            request.url = applicationProps.urlPrefix + request.url;
        }
        return jQuery.ajax(request);
    }
};

export default Request;