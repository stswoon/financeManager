import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import LoginForm from "./components/login/LoginForm";
import {Switch, Route} from 'react-router'

export default class App extends React.Component {
    render() {
        return (
            <app>
                <Switch>
                    <Route exact path='/' component={LoginForm}/>
                    <Route path='/dashboard' component={Dashboard}/>
                </Switch>
            </app>
        )
    }
}