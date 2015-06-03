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

});