import React from "react";

import {loginActions} from '../redux/login.actions';
import {connect} from "react-redux";
import LoginForm from "../components/login/LoginForm";
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

    render() {
        let result = this.props.authData ?
            <Redirect to={"/"}></Redirect> : <LoginForm handleSubmit={this.handleSubmit}></LoginForm>;
        return (
            <login-page>
                {result}
            </login-page>
        );
    }
}

function mapStateToProps(state) {
    const {loginReducer} = state;
    return loginReducer;
}
const connected = connect(mapStateToProps)(LoginPage);
export {connected as LoginPage};

//export default withRouter(Login); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4