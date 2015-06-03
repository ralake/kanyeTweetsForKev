var chai = require('chai');
var expect = chai.expect;

describe('Homepage', function() {

  it('has a title', function(done) {
    browser
      .url('http://localhost:3000')
      .getText('h1', function(error, text) {
        expect(text).to.eq('Kev Loves Kanye 4eva');
      })
      .call(done);
  });

  it('has a list of tweets', function(done) {
    browser
      .url('http://localhost:3000')
      .getHTML('ul', function(error, list) {
        expect(list).to.contain('<li class="kanyeTweet">')
      })
      .call(done);
  });

  it('displays tweets by content, hashtags and time created', function(done) {
    browser
      .url('http://localhost:3000')
      .getHTML('li', function(error, tweets) {
        tweets.forEach(function(tweet) {
          if(tweet.indexOf('tweet_hashtag') > -1) {
            expect(tweet).to.contain('<p class="tweet_text">')
            expect(tweet).to.contain('<p class="tweet_hashtag">')
            expect(tweet).to.contain('<p class="tweet_created_at">')
          }
        });
      })
      .call(done);
  });

});