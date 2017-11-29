import React from 'react';
import {StaticRouter} from 'react-router-dom';

import {dashboardActions} from './pages/dasboard/dashboard.actions';
import {loginActions} from './pages/login/login.actions';
import App from './App.jsx';
import {store} from "./AppStore";

class AppServer extends React.Component {
    constructor(props) {
        super(props);
        
        //console.log("Operations from server init: ", this.props.operations);
        //this.props.dispatch(dashboardActions.setOperations(operations));
    }

    render() {
        return (
            <StaticRouter location={this.props.url}>
                <App></App>
            </StaticRouter>
        );
    }
}

export {AppServer as AppServer};



function initStore(data) {
    store.dispatch(dashboardActions.setOperations(data.operations));
    store.dispatch(dashboardActions.setCurrentProject(data.currentProjectId));
    store.dispatch(loginActions.success({})); //fake authData
}
export {initStore as initStore};

