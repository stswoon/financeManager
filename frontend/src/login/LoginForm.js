import React from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import jQuery from "jQuery"
// import * from "antd/dist/antd.css"; //todo
require("antd/dist/antd.css");
require("./login-form.less");
const FormItem = Form.Item;

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

        var request = {
            type: this.isRegistration() ? "POST" : "GET",
            //url: envData.gateway + "/backend/user",
            url: envData.gateway + "/user",
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            // body: JSON.stringify({...this.state, name: this.state.login})
            data: JSON.stringify({login: this.state.login, password: this.state.password})
        };
        (async () => {
            try {
                let response = await jQuery.ajax(request);
                // let response = await fetch(envData.gateway + "/backend/user", config);
                let user = response.json();
                alert("Done, userId = " + user.id);
            } catch (response) {
                alert("Failed to operate with user, reason: " + response.json().error);
            }
        })();

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
                <Button type="primary" htmlType="submit" className="login-form-button">
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