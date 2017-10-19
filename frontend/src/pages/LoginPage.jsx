import React from "react";
import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import jQuery from "jquery"
import {Redirect, Route} from 'react-router-dom';
import Cookie from "js-cookie";
import {withRouter} from "react-router-dom";

import Request from "../../../src/utils/ajax";
import constants from "../../../src/utils/constants";
import authUtils from "../../../src/utils/authentication";

import { loginActions } from '../redux/actions/loginactions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch(loginActions.logout());
        Cookie.set(constants.authenticationCookieName, {});
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    };

    handleSubmit(event) {
        event.preventDefault(); //cancel normal html submit

        if (this.isRegistration()) {
            register.call(this);
        } else {
            login.call(this);
        }
    }

    isRegistration() {
        return this.state.type === "registration";
    }

    handleChangeLoginType() {
        const type = this.isRegistration() ? "login" : "registration";
        this.setState({type});
    }

    render() {
        const formItems = [];
        formItems.push(
            <FormItem>
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                       placeholder="Username"
                       name="login"
                       value={this.state.login}
                       onChange={this.handleInputChange}
                />
            </FormItem>
        );
        formItems.push(
            <FormItem>
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                       type="password"
                       placeholder="Password"
                       name="password"
                       value={this.state.password}
                       onChange={this.handleInputChange}
                />
            </FormItem>
        );
        if (this.isRegistration()) {
            formItems.push(
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                           type="password"
                           placeholder="Repeat Password"
                           name="passwordRepeat"
                           value={this.state.passwordRepeat}
                           onChange={this.handleInputChange}
                    />
                </FormItem>
            );
        }
        formItems.push(
            <FormItem>
                <Checkbox>Remember me</Checkbox>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.login}>
                    {this.isRegistration() ? "Register" : "Log in"}
                </Button>
                <span className="login-form_register-link">
                    or&nbsp;
                    <a href="#" onClick={this.handleChangeLoginType}>
                        {this.isRegistration() ? "back to log in" : "register"}
                    </a>
                </span>
            </FormItem>
        );

        return (
            <Form className="login-form" layout="horizontal" onSubmit={this.handleSubmit}>
                {formItems}
            </Form>
        )
    }


}

export default withRouter(Login); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4