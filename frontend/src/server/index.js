import express from "express"
import React from "react";
import {renderToString} from "react-dom/server";
import App from "../App"
const path = require("path");
import {StaticRouter} from "react-router-dom";
console.log("starting express");
const app = express();

import "isomorphic-fetch"


app.get("/server", (req, res) => {
    //var f = require("../index.html");
    //res.send(f); //todo file from dist
    res.send(`
        ${renderToString(<App/>)}
    `);
});

app.get("/api", (req, res) => {
    res.json({name:"john"});
});


//https://www.npmjs.com/package/express-interceptor //todo cherio
var interceptor = require('express-interceptor');
var finalParagraphInterceptor = interceptor(function(req, res){
    return {
        isInterceptable: function(){
            let b = /text\/html/.test(res.get('Content-Type'));
            console.log(b);
            return b;
        },
        intercept: function(body, send) {
            console.log("server listen");
            console.log(req.get('host'));
            console.log(req.protocol);
            //console.log(req);
            let fullUrl = (req.protocol||"http") + '://'+ req.get('host')+"/api";
            console.log(fullUrl);

            fetch(fullUrl)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    body = body.replace('<div id="root"></div>', '<div test="test" id="root">'+
                        renderToString(<StaticRouter location={req.url} context={data.name}><App/></StaticRouter>)+'</div>')
                    send(body);
                })
                .catch(e => {
                    console.log(e);
                    send(body);
                });
        }
    };
});
app.use(finalParagraphInterceptor);
app.use(express.static("dist"));


app.listen(process.env.PORT || 9000, () => {
    console.log("server listen");
});