import React from "react";
import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import jQuery from "jquery"
import {Redirect, Route} from 'react-router-dom';
import Cookie from "js-cookie";
import {withRouter} from "react-router-dom";

import Request from "../../../src/utils/ajax";
import constants from "../../../src/utils/constants";
import authUtils from "../../../src/utils/authentication";

import "antd/dist/antd.css";
import "./login-form.less";

const FormItem = Form.Item;

function register() { //todo
    const userDto = {login: this.state.login, password: this.state.password};
    var request = new Request("POST", "/auth/user", userDto).send()
        .then((res) => alert(res))
        .catch((res) => alert("Error" + res));
}

async function login() {
    console.debug("Starting login");

    let loginUrl = constants.loginUrl.replace("{login}", this.state.login).replace("{password}", this.state.password);
    let request = new Request({
        type: "POST",
        url: loginUrl,
        headers: {
            'Authorization': 'Basic b2F1dGgyX2NsaWVudDpvYXV0aDJfY2xpZW50X3NlY3JldA==' //todo hide in node internal request
        }
    });

    try {
        let response = await request.send();
        const bearerToken = response.access_token;
        console.info("Bearer token = " + bearerToken);

        response = await (new Request("GET", "/auth/user/" + this.state.login)).send();
        console.info("Login is sucessful, userId = " + response.id);

        Cookie.set(constants.authenticationCookieName, {
            userId: response.id,
            bearerToken: bearerToken
        });

        this.props.history.push('/dashboard/');
    } catch (response) {
        if (response.status == 400) {
            message.warning("Login or password are incorrect");
            console.debug("Login or password are incorrect");
        } else {
            message.error(constants.unexpectedErrorMessage);
            console.error("Failed to login user, response: ", response);
        }
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeLoginType = this.handleChangeLoginType.bind(this);
    }

    componentWillMount() {
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