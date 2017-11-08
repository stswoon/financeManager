import React from "react";

import {loginActions} from './login.actions';
import {connect} from "react-redux";
import LoginForm from "../../components/login/LoginForm";
import Redirect from "react-router-dom/es/Redirect";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch(loginActions.logout());
    }

    handleSubmit = (username, password) => {
        this.props.dispatch(loginActions.login(username, password));
    };
    handleRegistration = (username, password) => {
        this.props.dispatch(loginActions.register(username, password));
    };

    render() {
        if (this.props.authData) {
            return (<Redirect to={"/"}></Redirect>);
        }
        return (
            <LoginForm
                handleSubmit={this.handleSubmit}
                handleRegistration={this.handleRegistration}
            ></LoginForm>
        )
    }
}

function mapStateToProps(state) {
    const {loginReducer} = state;
    return loginReducer;
}

const connected = connect(mapStateToProps)(LoginPage);
export {connected as LoginPage};

//export default withRouter(Login); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4