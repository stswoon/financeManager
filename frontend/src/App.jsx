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
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route path='/dashboard/:projectId' component={Dashboard}/>
                </Switch>
            </app>
        )
    }
}

//https://habrahabr.ru/post/329996/
//https://gist.github.com/fdidron/ebcf52dc1ed62ff7d80725854d631a9e
//https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
//https://maxfarseer.gitbooks.io/react-router-course-ru/content/podklyuchaem_react-router.html