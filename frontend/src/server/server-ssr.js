const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require('fs');
const express = require('express');

const App = require("../App");
//todo https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c
//https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html#Node.js_run
//https://www.youtube.com/watch?v=duhudXkHRf4

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(function (req, res, next) {
    if (req.url.match(/.*\.(css|js|img|font)/)) {
        console.log("anneq001::");
        res.setHeader('Cache-Control', 'public, max-age=31557600'); //1 year
    }
    next();
});
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');



const file = fs.readFileSync(__dirname + '/public/index.html', "utf8");
console.log("anneq002::" + file);

app.get('/*', function (request, response) {
    console.log("anneq003::url=" + request.url);
    const reactData = ReactDOMServer.renderToString(<App/>);
    console.log("anneq004::reactDat=" + reactData);
    const result = file.replace("<div id=\"root\"></div>", reactData);
    response.send(result);
    console.log("anneq005::");
});



app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});