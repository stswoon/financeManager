import React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {BrowserRouter} from "react-router-dom";

import App from "./App.jsx";

import "./style.less"

import register from "./service-worker-registration";

register();

if (process.env.NODE_ENV !== "production") {
    const {whyDidYouUpdate} = require("why-did-you-update");
    whyDidYouUpdate(React);
    const {Perf} = require("react-addons-perf");
    window.Perf = Perf;
}




render(
    <AppContainer>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AppContainer>,
    document.querySelector("#root")
);

if (module && module.hot) { //todo also for redux
    module.hot.accept("./App.jsx", () => {
        const App = require("./App.jsx").default;
        render(
            <AppContainer>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AppContainer>,
            document.querySelector("#root")
        );
    });
}