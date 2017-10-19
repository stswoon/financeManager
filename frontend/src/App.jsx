import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import LoginForm from "./components/login/LoginForm";
import {Switch, Route} from 'react-router'
import Request from "./utils/ajax";
import WelcomeRedirect from "./components/welcome/WelcomeRedirect";

import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
//import {createStore, renderDevTools} from './utils/devTools';
//import * as reducers from 'redux/reducers';
import { createStore } from 'redux';
import appStore from './redux/reducers';

let store = createStore(appStore);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        Request.setApplicationProps({urlPrefix: envData.gateway});
    }

    render() {
        return (
            <app>
                <Provider store={store}>
                    <Switch>
                        <Route exact path='/' component={WelcomeRedirect}/>
                        <Route exact path='/login' component={LoginForm}/>
                        <Route exact path='/dashboard' component={Dashboard}/>
                        <Route path='/dashboard/:projectId' component={Dashboard}/>
                    </Switch>
                </Provider>
                {/*{renderDevTools(store)}*/}
            </app>
        )
    }
}

//https://habrahabr.ru/post/329996/
//https://gist.github.com/fdidron/ebcf52dc1ed62ff7d80725854d631a9e
//https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
//https://maxfarseer.gitbooks.io/react-router-course-ru/content/podklyuchaem_react-router.html