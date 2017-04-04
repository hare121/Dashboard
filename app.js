var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

var port = process.env.PORT || 4000;

app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] === 'https'){
    res.redirect('http://' + req.hostname + req.url);
  }
  else{
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(port, function(){
  console.log('Server listening on port: ', port);
})

module.exports = app;
