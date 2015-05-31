var express = require('express');
var app = express();
var server = require('http').createServer(app);
var TwitterAPI = require('twitter');
var port = process.env.PORT || 3000;

var twitter = new TwitterAPI({ 
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token_key: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  twitter.get('statuses/user_timeline', {
    screen_name: 'kanyewest',
    exclude_replies: 'true',
    include_rts: 'false'
  }, function(error, tweets, response){
    console.log(tweets);
    res.render('index', {tweets: tweets})
  });
});

server.listen(port, function() {
  console.log('server listening on port: ' + port);
});

module.exports = server;