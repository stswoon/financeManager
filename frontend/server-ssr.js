const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const express = require('express');
const path = require('path'); //https://stackoverflow.com/a/14594282
const fetch = require('isomorphic-fetch');
var cookieParser = require('cookie-parser');
//globals.Promise = require("bluebird"); //https://github.com/mozilla/pdf.js/issues/8489
var compression = require('compression');
const bodyParser = require('body-parser'); //https://expressjs.com/en/resources/middleware/body-parser.html#bodyparserrawoptions
const app = express();
//app.use(bodyParser.urlencoded({ extended: false })); //https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
app.use(cookieParser()); //http://expressjs.com/ru/api.html
app.use(compression());

const csp = require('express-csp-header');
app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'script-src': [csp.SELF, '\'unsafe-inline\''], //SW
        'connect-src': [csp.SELF, 'localhost', 'stswoon-fm-gateway.herokuapp.com'],
        'font-src': [csp.SELF, 'at.alicdn.com'], //antd
        'style-src': [csp.SELF, '\'unsafe-inline\''] //antd or SSR
    }
}));

app.set('port', (process.env.PORT || 5000));
app.use(function (req, res, next) {
    if (req.url.match(/.*\.(css|js|png|font)/)) {
        console.log('anneq001::');
        res.setHeader('Cache-Control', 'public, max-age=31557600'); //1 year
    }
    next();
});
//const safePath = path.resolve(__dirname + '../../../public');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');


let file = null;
let AppServer = null;
let initStore = null;
//console.log("anneq002::" + file);

//https://github.com/mhart/react-server-example
//const AppServer = require("../../public/react-for-server").AppServer; //.default https://stackoverflow.com/a/34130767 //todo rename to server-bundle
//const AppInstance1 = React.createFactory(rApp);
//todo https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c
//https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html#Node.js_run
//https://www.youtube.com/watch?v=duhudXkHRf4
app.get('/dashboard/*', function (request, response) {
    try {
        if (!file && !AppServer) {
            file = fs.readFileSync(__dirname + '/public/index.html', 'utf8');
            AppServer = require('./public/react-for-server').AppServer;
            initStore = require('./public/react-for-server').initStore;
        }

        console.log('anneq003::url=' + request.url);
        let auth = JSON.parse(request.cookies['auth-token']);
        console.log('anneq003::auth=' + auth);
        console.log('anneq003::auth.userId=' + auth.userId);
        console.log('anneq003::auth.bearerToken=' + auth.bearerToken);
        let projectId = request.url.replace('/dashboard/', '');
        let fetchConfig = {
            method: 'get',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth.bearerToken
            }
        };


        let projectsPromise = fetch('https://stswoon-fm-gateway.herokuapp.com/backend/project/' + auth.userId, fetchConfig).then(res => res.json());
        let operationsPromise = fetch('https://stswoon-fm-gateway.herokuapp.com/backend/operation/' + projectId, fetchConfig).then(res => res.json());
        let statisticPromise = fetch('https://stswoon-fm-gateway.herokuapp.com/backend/statistics/' + projectId, fetchConfig).then(res => res.json());
        Promise.all([projectsPromise, operationsPromise, statisticPromise])
            .then(([projects, operations, statistic]) => {
                console.log('anneq003_1::projects.length=' + projects.length);
                console.log('anneq003_1::operations.length=' + operations.length);
                console.log('anneq003_1::projectId=' + projectId);
                let initData = {
                    operations: operations,
                    currentProjectId: projectId,
                    projects: projects,
                    auth: auth,
                    statistic: statistic
                };
                //todo (diagram should be loaded after)
                initStore(initData);
                const AppInstance2 = React.createElement(AppServer, {url: request.url}, null);
                let reactData = ReactDOMServer.renderToString(AppInstance2);
                reactData = '<div id="root">' + reactData + '</div>';
                console.log('anneq004::reactData=' + reactData);
                let initDataAsString = '<script>window.__initialData__ = ' + JSON.stringify(initData) + '</script>';
                console.log('anneq005::initDataAsString=' + initDataAsString);
                reactData += '\n' + initDataAsString;
                const result = file.replace('<div id="root"></div>', reactData);
                response.send(result);
                console.log('anneq006::');
            });
    } catch (e) {
        console.error('Error during SSR', e);
        var safePath = path.resolve(__dirname + '/public/index.html');
        response.sendFile(safePath);
    }
});


app.get(['/', '/login', '/dashboard'], function (request, response) {
    console.log('anneq007::url=' + request.url);
    var safePath = path.resolve(__dirname + '/public/index.html');
    response.sendFile(safePath);
});

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false}); //https://github.com/expressjs/body-parser
//var https = require('https');
var querystring = require('querystring'); //http://www.codexpedia.com/node-js/node-js-making-https-post-request-with-x-www-form-urlencoded-data/
app.post('/serverLogin', urlencodedParser, function (request, response) {
    var postData = querystring.stringify({...request.body});
    let fetchConfig = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Basic b2F1dGgyX2NsaWVudDpvYXV0aDJfY2xpZW50X3NlY3JldA==',
            'accept': 'application/json; charset=UTF-8'
        },
        body: postData
    };
    let login = fetch('https://stswoon-fm-gateway.herokuapp.com/auth/oauth/token', fetchConfig)
        .then(res => {
            return res.json().then(data => {
                response.set({
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': request.headers.origin
                });
                response.status(res.status).send(JSON.stringify(data));
            });
        });
});

app.get('/*', function (request, response) {
    console.log('anneq008::url=' + request.url);
    response.status(404).send('Not found');
});

var cors = require('cors'); //https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.options('/logs', cors()); //https://expressjs.com/en/resources/middleware/cors.html#enabling-cors-pre-flight
app.post('/logs', bodyParser.json(), function (request, response) {
    console.log('Browser to Server logs:: ' + JSON.stringify(request.body));
    response.set({
        'Access-Control-Allow-Origin': request.headers.origin
    });
    response.status(200).send('');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

//express featuress https://nodeguide.ru/doc/modules-you-should-know/express/