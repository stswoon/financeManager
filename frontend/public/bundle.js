"use strict";

fetch("https://stswoon-fm-gateway.herokuapp.com/backend/hello/me")
    .then(function (response) {
        console.log(response);
        return response.text();
        // console.lresponse.json()
    })
    .then(function (data) {
        console.log(data);
        alert("See console. Anr response is '" + data + "'");
    });