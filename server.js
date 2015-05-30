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
  process.env.oauth_token = req.query('oauth_token');
  process.env.oauth_verifier = req.query('oauth_verifier');
  twitter.getAccessToken(process.env.requestToken, process.env.requestTokenSecret, process.env.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
    if (error) {
      console.log(error);
    } else {
      process.env.accessToken = accessToken;
      process.env.accessTokenSecret = accessTokenSecret;
      twitter.search('show', {
        q: '@kanyewest'
      },
      process.env.accessToken,
      process.env.accessTokenSecret,
      function(error, data, response) {
        if(error) {
          console.log(error);
        }
        else {
          var tweets = data;
          res.render('index', {tweets: tweets});
        }
      });
    }
  });
});

server.listen(port, function() {
  console.log('server listening on port: ' + port);
});

module.exports = server;