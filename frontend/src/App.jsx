import React from "react";
import {Switch, Route} from 'react-router'
import {Provider} from 'react-redux';

import Request from "./services/request.service";
import {store} from './AppStore';
import {LoginPage} from "./pages/login/LoginPage";
import {PrivateRoute} from "./pages/utils/PrivateRoute";
import {WelcomePage} from "./pages/WelcomePage";
import {DashboardPage} from "./pages/dasboard";
//import {renderDevTools} from './utils/devTools';
import {message} from "antd";
import {loginActions} from "./pages/login/login.actions";
import Logger from "./services/log.service";
import constants from "./utils/constants";


const errorResponseHandler = (response) => {
    if (response.status == 401) {
        console.log("Unauthenticated, response = ", response);
        message.warn("Unauthenticated");
        store.dispatch(loginActions.logout()); //todo???
    } else {
        console.error("Unexpected error, response = ", response);
        message.error(constants.unexpectedErrorMessage);
    }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        Request.setApplicationProps({urlPrefix: envData.gateway});
        Request.setErrorResponseHandler(errorResponseHandler);
        Logger.integrate();
        Logger.setSendServerLogs(false); //todo remove after server side  will be ready
    }

    render() {
        return (
            <app>
                <Provider store={store}>
                    <Switch>
                        <Route exact path='/' component={WelcomePage}/>
                        <Route exact path='/login' component={LoginPage}/>
                        <PrivateRoute exact path='/dashboard' component={DashboardPage}/>
                        <PrivateRoute path='/dashboard/:projectId' component={DashboardPage}/>
                        {/*todo 404*/}
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