import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import css from "./main.less" //todo why not used
require("./main.less"); //todo why not used

console.log("Hello World! Yahoo");

import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById("root")
);

if (module.hot) { //todo only for dev
    console.log("sss");
    module.hot.accept("./App", () => {
        const NextApp = require("./App").default;
        ReactDOM.render(<NextApp/>, document.getElementById("root"));
    });
}