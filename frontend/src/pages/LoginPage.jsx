import React from "react";

import {loginActions} from '../redux/login.actions';
import {connect} from "react-redux";
import LoginForm from "../components/login/LoginForm";

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
        return (
            <LoginForm handleSubmit={this.handleSubmit}></LoginForm>
        )
    }
}

function mapStateToProps(state) {
    const {loginState} = state.loginReducer;
    return {}
}
const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};

//export default withRouter(Login); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4