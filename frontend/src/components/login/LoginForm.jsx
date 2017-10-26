import React from "react";
import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import {Redirect, Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";

import Request from "../../services/request.service";
import constants from "../../../src/utils/constants";

import "antd/dist/antd.css";
import "./login-form.less";

const FormItem = Form.Item;

//http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeLoginType = this.handleChangeLoginType.bind(this);
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
            this.props.handleSubmit(this.state.login, this.state.password);
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