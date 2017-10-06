import React from "react";
import {Redirect} from 'react-router-dom';

import AuthUtils from "../../../src/utils/authentication";

class WelcomeRedirect extends React.Component {
    render() {
        if (AuthUtils.isAuthenticated()) {
            return <Redirect to="/dashboard"/>
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default WelcomeRedirect;