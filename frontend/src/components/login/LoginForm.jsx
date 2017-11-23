import React from "react";
import {Form, Icon, Input, Button} from "antd";
import {withRouter} from "react-router-dom";

import "./login-form.less";

const FormItem = Form.Item;

//http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {warnings: false};

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
            if (!this.state.warnings) {
                this.props.handleRegistration(this.state.login, this.state.password);
            }
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
            <FormItem key="username">
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                       placeholder="Username"
                       name="login"
                       value={this.state.login}
                       onChange={this.handleInputChange}
                />
            </FormItem>
        );

        formItems.push(
            <FormItem key="password">
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
            let validation = (show) => {
                if (!show) {
                    return {};
                }

                return {
                    validateStatus: "error",
                    help: "Doesn't equals to pasword"
                }
            }

            formItems.push(
                <FormItem key="passwordRepeat"
                    {...validation(this.state.passwordRepeat && this.state.password != this.state.passwordRepeat)}
                >
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

        const warning = this.isRegistration() && (!this.state.password || this.state.password != this.state.passwordRepeat)
        formItems.push(
            <FormItem key="controls">
                {/*<Checkbox>Remember me</Checkbox>*/}
                <Button type="primary" htmlType="submit" className="login-form-button"
                        onClick={this.login}
                        disabled={warning}>
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