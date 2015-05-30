var express = require('express');
var app = express();
var server = require('http').createServer(app);
var twitterAPI = require('node-twitter-api');
var port = process.env.PORT || 3000;

var twitter = new twitterAPI({
  consumerKey: process.env.consumerKey,
  consumerSecret: process.env.consumerSecret,
  callback: process.env.callbackURL
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
  if (error) {
    console.log("Error getting OAuth request token : " + error);
  } else {
    process.env.requestToken = requestToken;
    process.env.requestTokenSecret = requestTokenSecret;
  }
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.redirect(twitter.getAuthUrl(process.env.requestToken));
});

app.get('/kanye', function(req, res) {
  console.log('kanye')
  console.log(req.param('oauth_token'))
});



server.listen(port, function() {
  console.log('server listening on port 3000');
});

module.exports = server;