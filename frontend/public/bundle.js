"use strict";

fetch("https://stswoon-fm-gateway.herokuapp.com/backend/hello/me").then(function(response) {
   console.log(response);
   alert("See console");
});