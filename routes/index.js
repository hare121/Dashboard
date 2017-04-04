var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res){
  res.render('index');
})

router.get('/data', function(req, res) {
  fs.readFile('data.json', 'utf8', function(err, data) {
    res.send(data);
  })
})

module.exports = router;
