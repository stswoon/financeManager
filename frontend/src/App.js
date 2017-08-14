import React from "react";
import routes from "./routes";
import {Switch, Route} from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                {routes.map((route, i) => <Route key={i} {...route} />)}
            </Switch>
        );
    }
}