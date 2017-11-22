var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(function (req, res, next) {
    console.log("anneq003:url="+req.url);
    if (req.url.match(/.*\.(css|js|img|font)/)) {
        console.log("anneq004");
        res.setHeader('Cache-Control', 'public, max-age=31557600'); //1 year
    }
    next();
});

app.use(express.static(__dirname + '/public'));

//app.set('view engine', 'ejs');
 app.set('view engine', 'html');

app.get('/*', function (request, response) {
    //response.render('index');
    console.log("anneq001::url="+request.url);
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
