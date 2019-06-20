var express = require('express');
var router = express.Router();
var fs = require('fs');
var axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res){
  res.render('index');
  //console.log('console error');
})
router.get('/home', function(req, res){
  //res.render('index');
  //database call
  // replace the uri string with your connection string.
  var url = "mongodb://admin:admin123@cluster0-shard-00-00-xydjz.azure.mongodb.net:27017,cluster0-shard-00-01-xydjz.azure.mongodb.net:27017,cluster0-shard-00-02-xydjz.azure.mongodb.net:27017/emailsOutlook?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("emailsOutlook");
    dbo.collection("userEmail").find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
      db.close();
    });
  });
  console.log('console error');
})


router.get('/data', function(req, res) {

  // var authOptions = {
  //     method: 'GET',
  //     url: 'http://localhost:8080/UBSCAIP/DashConnect/getDashData',
  //     headers: {
  //       'Content-Type' : 'application/json'
  //     }
  // };
  // axios(authOptions).then(function(response){
  // //  console.log(response.data);
  //   res.send(response.data);
  // }).catch(function(err){
  //   res.send(err.response.data);
  // });

  fs.readFile('data.json', 'utf8', function(err, data) {
    res.send(data);
  })
})

router.get('/report', function(req, res) {

  var authOptions = {
      method: 'GET',
      url: 'http://localhost:8080/UBSCAIP/DashConnect/chartData',
      headers: {
        'Content-Type' : 'application/json'
      }
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });
})

router.post('/postStatus', function(req, res) {

  var authOptions = {
      method: 'POST',
      url: 'http://localhost:8080/UBSCAIP/DashConnect/updateStatus',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });
})

router.post('/postEmail', function(req, res) {
  var authOptions = {
      method: 'POST',
      url: 'http://10.208.165.226:8080/UBSCAIP/DashConnect/getEmail',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });

    // fs.readFile('email.json', 'utf8', function(err, data) {
    //   res.send(data);
    // })
})

router.post('/postGlobalVal', function(req, res) {
  var authOptions = {
      method: 'POST',
      url: 'http://10.208.165.226:8080/UBSCAIP/DashConnect/getGlobalValue',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });

    // fs.readFile('email.json', 'utf8', function(err, data) {
    //   res.send(data);
    // })
})

router.post('/setGlobalAccept', function(req, res) {
  var authOptions = {
      method: 'POST',
      url: 'http://10.208.165.226:8080/UBSCAIP/DashConnect/globalBkgacceptance',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });
})

router.post('/setCareUpdate', function(req, res) {
  var authOptions = {
      method: 'POST',
      url: 'http://10.208.165.226:8080/UBSCAIP/DashConnect/careUpdatetick',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });
})

router.post('/setTLMUpdate', function(req, res) {
  var authOptions = {
      method: 'POST',
      url: 'http://10.208.165.226:8080/UBSCAIP/DashConnect/tlmUpdatetick',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });
})

router.get('/runTrigger', function(req, res) {
  var authOptions = {
      method: 'POST',
      url: 'http://10.208.165.226:8080/UBSCAIP/trigger/triggerClaimsManager',
      headers: {
        'Content-Type' : 'application/json'
      },
      data: req.body
  };
  axios(authOptions).then(function(response){
    res.send(response.data);
  }).catch(function(err){
    res.send(err.response.data);
  });
})

module.exports = router;
