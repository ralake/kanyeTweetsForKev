var express = require('express');
var app = express();
var server = require('http').createServer(app);
var twitterAPI = require('node-twitter-api');
var twitterConfig = require('./twitterConfig.js');

var twitter = new twitterAPI({
  consumerKey: twitterConfig.consumerKey,
  consumerSecret: twitterConfig.consumerSecret,
  callback: twitterConfig.callbackURL
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
  if (error) {
    console.log("Error getting OAuth request token : " + error);
  } else {
    twitterConfig.requestToken = requestToken;
    twitterConfig.requestTokenSecret = requestTokenSecret;
  }
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.redirect(twitter.getAuthUrl(twitterConfig.requestToken));
});

server.listen(3000, function() {
  console.log('server listening on port 3000');
});

module.exports = server;