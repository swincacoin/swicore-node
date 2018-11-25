'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export swicore-lib', function() {
    var swicore = require('../');
    should.exist(swicore.lib);
    should.exist(swicore.lib.Transaction);
    should.exist(swicore.lib.Block);
  });
});
