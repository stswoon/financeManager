import React from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import jQuery from "jQuery"
// import * from "antd/dist/antd.css"; //todo
require("antd/dist/antd.css");
require("./login-form.less");
const FormItem = Form.Item;
import { Redirect, Route } from 'react-router-dom';
import Request from "../../../src/utils/ajax";

const isAuthenticated = () => window.userId; //todo cookies

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOrLinkClick = this.handleOrLinkClick.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSubmit(event) {
        event.preventDefault(); //cancel normal html submit

        Request.setApplicationProps({urlPrefix: envData.gateway});

        //let loginUrl = "https://stswoon-fm-auth.herokuapp.com" + "/auth/oauth/token?grant_type=password&username={login}&password={password}";
        let loginUrl = "/auth/oauth/token?grant_type=password&username={login}&password={password}";
        loginUrl = loginUrl.replace("{login}", this.state.login).replace("{password}", this.state.password);
        let request = new Request({
            type: "POST",
            url: loginUrl,
            headers: {
                'Authorization':  'Basic b2F1dGgyX2NsaWVudDpvYXV0aDJfY2xpZW50X3NlY3JldA=='
            }
        });

        (async () => {
            let response = await request.send();
            let bearerToken =  response.access_token;
            console.debug("bearerToken = " + bearerToken);
            Request.setApplicationProps({headers: {Authorization : "Bearer " + bearerToken}});

            response = await (new Request({
                url: "/auth/user/" + this.state.login
            })).send();
            console.debug("Done, userId = " + response.id);

            window.userId = response.id;
            this.setState({auth: true});
        })();



        // var request = { //todo in separate class
        //     type: "POST",
        //     //url: envData.gateway + "/backend/user",
        //     url: envData.gateway + (this.isRegistration() ? "/backend/user" : loginUrl),
        //     headers: {
        //         'Accept': 'application/json;charset=UTF-8',
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         'Authorization':  'Basic b2F1dGgyX2NsaWVudDpvYXV0aDJfY2xpZW50X3NlY3JldA=='
        //     }
        //     // body: JSON.stringify({...this.state, name: this.state.login})
        //     //data: JSON.stringify({login: this.state.login, password: this.state.password})
        // };
        // (async () => {
        //     try {
        //         let response = await jQuery.ajax(request);
        //         alert("Done, userId = " + response.id);
        //         window.userId = response.id;
        //         this.setState({auth: true});
        //     } catch (response) {
        //         alert("Failed to operate with user, reason: " + response.json().error);
        //     }
        // })();
        //










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
    }

    isRegistration() {
        return this.state.type === "registration";
    }

    handleOrLinkClick() {
        const type = this.isRegistration() ? "login" : "registration";
        this.setState({type});
    }

    render() {
        if (isAuthenticated()) {
            // return <span>qqq</span>
            return <Redirect to="/dashboard" />
        }


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
                    <a href="#" onClick={this.handleOrLinkClick}>
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

export default Login;