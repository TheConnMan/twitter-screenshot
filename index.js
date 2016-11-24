var express = require('express');
var app = express();

var screenshot = require('./lib/screenshot').capture;

app.get('/screenshot/:user/:statusId', function (req, res) {
  screenshot(req.params.user, req.params.statusId).then(function(img) {
    res.sendFile(__dirname + '/' + img);
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
