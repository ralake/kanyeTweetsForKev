var chai = require('chai');
var expect = chai.expect;

describe('Homepage', function() {

  it('Title', function(done) {
    browser
      .url('http://localhost:3000')
      .getTitle(function(err, title) {
        expect(title).to.eq('Kev Loves Kanye 4eva');
      })
      .call(done);
  });

});