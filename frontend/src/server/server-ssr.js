const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require('fs');
const express = require('express');
const path = require('path'); //https://stackoverflow.com/a/14594282
const fetch = require('isomorphic-fetch');
var cookieParser = require('cookie-parser')


const app = express();
app.use(cookieParser()) //http://expressjs.com/ru/api.html
app.set('port', (process.env.PORT || 5001));
app.use(function (req, res, next) {
    if (req.url.match(/.*\.(css|js|img|font)/)) {
        console.log("anneq001::");
        res.setHeader('Cache-Control', 'public, max-age=31557600'); //1 year
    }
    next();
});
const safePath = path.resolve(__dirname + '../../../public');
app.use(express.static(safePath));
app.set('view engine', 'html');


const file = fs.readFileSync(__dirname + '../../../public/index.html', "utf8");
//console.log("anneq002::" + file);

//https://github.com/mhart/react-server-example
//const AppServer = require("../../public/react-for-server").AppServer; //.default https://stackoverflow.com/a/34130767 //todo rename to server-bundle
//const AppInstance1 = React.createFactory(rApp);
//todo https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c
//https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html#Node.js_run
//https://www.youtube.com/watch?v=duhudXkHRf4
app.get('/dashboard/*', function (request, response) {
    console.log("anneq003::url=" + request.url);
    let authToken = request.cookies["auth-token"];
    let projectId = request.url.replace("/dashboard/", "");
    let fetchConfig = {
        method: "get",
        headers: {
            'Accept': 'application/json;charset=UTF-8',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': "Bearer " + authToken
        }
    };

    const AppServer = require("../../public/react-for-server").AppServer;
    const initStore = require("../../public/react-for-server").initStore;

    fetch("https://stswoon-fm-gateway.herokuapp.com/backend/operation/" + projectId, fetchConfig)
        .then(res => res.json())
        .then(operations => {
            console.log("anneq003_1::operations.length=" + operations.length);
            console.log("anneq003_1::projectId=" + projectId);
            let initData = {
                operations: operations,
                currentProjectId: projectId
            };
            //todo get authData from cookie + recieve project => so full state will be get (diagram should be loaded after)
            initStore(initData);
            const AppInstance2 = React.createElement(AppServer, {url: request.url}, null);
            let reactData = ReactDOMServer.renderToString(AppInstance2);
            console.log("anneq004::reactData=" + reactData);
            let initDataAsString = "<script>window.__initialData__ = " + JSON.stringify(initData) + "</script>";
            console.log("anneq005::initDataAsString=" + initDataAsString);
            reactData += "\n" + initDataAsString;
            const result = file.replace("<div id=\"root\"></div>", reactData);
            response.send(result);
            console.log("anneq006::");
        })
});


// app.get('/*', function (request, response) {
//     console.log("anneq006::url=" + request.url);
//     var safePath = path.resolve(__dirname + '../../../public/index.html');
//     response.sendFile(safePath);
// });


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});