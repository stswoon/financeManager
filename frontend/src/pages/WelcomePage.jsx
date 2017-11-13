import React from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {loginActions} from "./login/login.actions";

//todo make in functional!!!!
class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.authenticated && !this.props.restoreAuthAttempt) {
            this.props.dispatch(loginActions.restoreLogin());
        }
    }

    render() {
        if (this.props.authenticated) {
            let to = this.props.from || "/dashboard";
            return <Redirect to={to}/>
        } else if (!this.props.authenticated && !this.props.restoreAuthAttempt) {
            return null;//do nothing - wait for restore
        } else {
            return <Redirect to="/login"/> //add props from
        }
    }
}

function mapStateToProps(state) {
    const {loginReducer} = state;
    return {authenticated: !!loginReducer.authData, restoreAuthAttempt: loginReducer.restoreAuthAttempt};
}

const connected = connect(mapStateToProps)(WelcomePage);
export {connected as WelcomePage};